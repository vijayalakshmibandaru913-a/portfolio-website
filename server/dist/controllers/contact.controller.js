"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactSubmission = exports.inMemoryMessages = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const contact_validator_js_1 = require("../validators/contact.validator.js");
const index_js_1 = require("../config/index.js");
exports.inMemoryMessages = [];
const handleContactSubmission = async (req, res) => {
    try {
        // 1. Zod Validation
        const validationResult = contact_validator_js_1.contactSchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed. Please verify your input.',
                errors: validationResult.error.format()
            });
            return;
        }
        const { name, email, subject, message } = validationResult.data;
        // 2. Sanitize and record message
        const storedRecord = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            name,
            email,
            subject,
            message,
            receivedAt: new Date().toISOString(),
            ip: req.ip || req.socket.remoteAddress || 'unknown'
        };
        exports.inMemoryMessages.push(storedRecord);
        console.log(`[Contact API] New message recorded: from "${name}" <${email}> - Subject: "${subject}"`);
        // 3. Optional SMTP Notification
        let emailDispatched = false;
        let emailStatusNote = 'Stored securely in server storage.';
        if (index_js_1.config.smtp.host && index_js_1.config.smtp.user && index_js_1.config.smtp.pass) {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    host: index_js_1.config.smtp.host,
                    port: index_js_1.config.smtp.port,
                    secure: index_js_1.config.smtp.port === 465,
                    auth: {
                        user: index_js_1.config.smtp.user,
                        pass: index_js_1.config.smtp.pass
                    }
                });
                await transporter.sendMail({
                    from: `"Portfolio Contact" <${index_js_1.config.smtp.user}>`,
                    to: index_js_1.config.smtp.recipient,
                    replyTo: email,
                    subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
                    text: `You received a message from ${name} (${email}):\n\nSubject: ${subject}\n\n${message}\n\nSent at: ${storedRecord.receivedAt}`,
                    html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f9f9fb; border-radius: 8px;">
              <h2 style="color: #0284c7; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Time:</strong> ${storedRecord.receivedAt}</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <div style="background: #ffffff; padding: 16px; border-left: 4px solid #0284c7; border-radius: 4px;">
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
              </div>
            </div>
          `
                });
                emailDispatched = true;
                emailStatusNote = 'Email notification successfully delivered to inbox.';
            }
            catch (mailError) {
                console.warn('[Contact API] SMTP notification delivery failed, but message was safely preserved:', mailError.message);
                emailStatusNote = 'Message safely logged. (SMTP server notification encountered an error; message remains stored).';
            }
        }
        else {
            emailStatusNote = 'Message received and stored in server memory. (SMTP credentials not configured in backend .env for live forwarding).';
        }
        res.status(201).json({
            success: true,
            message: `Thank you, ${name}! Your message has been received.`,
            emailDispatched,
            statusNote: emailStatusNote,
            recordId: storedRecord.id
        });
    }
    catch (err) {
        console.error('[Contact API] Unexpected error handling contact submission:', err);
        res.status(500).json({
            success: false,
            message: 'An internal server error occurred while processing your message. Please try again or reach out directly at Vijayalakshmibandaru913@gmail.com'
        });
    }
};
exports.handleContactSubmission = handleContactSubmission;
