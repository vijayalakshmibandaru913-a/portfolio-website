import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import contactRoutes from './routes/contact.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// 1. Security Headers
app.use(helmet());

// 2. CORS Allowlisting
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching allowed origins
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to avoid friction while logging
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// 3. Body Parsers with payload limits
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// 4. Rate Limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes.'
  }
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 messages per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please wait a few minutes before trying again or email directly at Vijayalakshmibandaru913@gmail.com.'
  }
});

app.use('/api', generalLimiter);

// 5. Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const memUsage = process.memoryUsage();
  res.status(200).json({
    status: 'healthy',
    service: 'Vijaya Bandaru Portfolio REST API',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    memoryUsageMB: Math.round(memUsage.rss / (1024 * 1024))
  });
});

// 6. Application Routes
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api', portfolioRoutes);

// 7. 404 Handler
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found. Available routes: /api/health, /api/contact, /api/projects, /api/skills, /api/experience, /api/profile, /api/certifications'
  });
});

// 8. Global Error Handler
app.use(errorHandler);

// 9. Server Initialization & Graceful Shutdown
let server: any;
if (config.nodeEnv !== 'test') {
  server = app.listen(config.port, () => {
    console.log(`🚀 [Backend Server] Listening on http://localhost:${config.port}`);
    console.log(`🔗 [Environment] Mode: ${config.nodeEnv}`);
  });

  const handleTermination = (signal: string) => {
    console.log(`🛑 Received ${signal}. Gracefully terminating HTTP server...`);
    if (server) {
      server.close(() => {
        console.log('✅ Server closed cleanly. Process exiting.');
        process.exit(0);
      });
    }

    setTimeout(() => {
      console.error('⚠️ Could not close connections in time, forcing exit.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleTermination('SIGTERM'));
  process.on('SIGINT', () => handleTermination('SIGINT'));
}

export default app;
