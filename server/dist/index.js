"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const index_js_1 = require("./config/index.js");
const contact_routes_js_1 = __importDefault(require("./routes/contact.routes.js"));
const portfolio_routes_js_1 = __importDefault(require("./routes/portfolio.routes.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const app = (0, express_1.default)();
// 1. Security Headers
app.use((0, helmet_1.default)());
// 2. CORS Allowlisting
const allowedOrigins = [
    index_js_1.config.clientUrl,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman) or matching allowed origins
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
            callback(null, true);
        }
        else {
            callback(null, true); // Permissive in dev to avoid friction while logging
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// 3. Body Parsers with payload limits
app.use(express_1.default.json({ limit: '100kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '100kb' }));
// 4. Rate Limiters
const generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests from this IP address, please try again after 15 minutes.'
    }
});
const contactLimiter = (0, express_rate_limit_1.default)({
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
app.get('/api/health', (_req, res) => {
    const memUsage = process.memoryUsage();
    res.status(200).json({
        status: 'healthy',
        service: 'Vijaya Bandaru Portfolio REST API',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        environment: index_js_1.config.nodeEnv,
        memoryUsageMB: Math.round(memUsage.rss / (1024 * 1024))
    });
});
// 6. Application Routes
app.use('/api/contact', contactLimiter, contact_routes_js_1.default);
app.use('/api', portfolio_routes_js_1.default);
// 7. 404 Handler
app.use('*', (_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found. Available routes: /api/health, /api/contact, /api/projects, /api/skills, /api/experience, /api/profile, /api/certifications'
    });
});
// 8. Global Error Handler
app.use(errorHandler_js_1.errorHandler);
// 9. Server Initialization & Graceful Shutdown
let server;
if (index_js_1.config.nodeEnv !== 'test') {
    server = app.listen(index_js_1.config.port, () => {
        console.log(`🚀 [Backend Server] Listening on http://localhost:${index_js_1.config.port}`);
        console.log(`🔗 [Environment] Mode: ${index_js_1.config.nodeEnv}`);
    });
    const handleTermination = (signal) => {
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
exports.default = app;
