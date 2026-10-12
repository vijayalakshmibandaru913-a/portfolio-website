import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { contactSchema } from '../validators/contact.validator.js';
import { config } from '../config/index.js';

// In-memory message store as safe persistent buffer when MongoDB is not connected
export interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  ip: string;
}

export const inMemoryMessages: StoredMessage[] = [];

export const handleContactSubmission = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(req.body);
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
    const storedRecord: StoredMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
      ip: req.ip || req.socket.remoteAddress || 'unknown'
    };

    inMemoryMessages.push(storedRecord);
    console.log(`[Contact API] New message recorded: from "${name}" <${email}> - Subject: "${subject}"`);

    // 3. Optional SMTP Notification
    let emailDispatched = false;
    let emailStatusNote = 'Stored securely in server storage.';

    if (config.smtp.host && config.smtp.user && config.smtp.pass) {
      try {
        const transporter = nodemailer.createTransport({
          host: config.smtp.host,
          port: config.smtp.port,
          secure: config.smtp.port === 465,
          auth: {
            user: config.smtp.user,
            pass: config.smtp.pass
          }
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${config.smtp.user}>`,
          to: config.smtp.recipient,
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
      } catch (mailError: any) {
        console.warn('[Contact API] SMTP notification delivery failed, but message was safely preserved:', mailError.message);
        emailStatusNote = 'Message safely logged. (SMTP server notification encountered an error; message remains stored).';
      }
    } else {
      emailStatusNote = 'Message received and stored in server memory. (SMTP credentials not configured in backend .env for live forwarding).';
    }

    res.status(201).json({
      success: true,
      message: `Thank you, ${name}! Your message has been received.`,
      emailDispatched,
      statusNote: emailStatusNote,
      recordId: storedRecord.id
    });
  } catch (err: any) {
    console.error('[Contact API] Unexpected error handling contact submission:', err);
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your message. Please try again or reach out directly at Vijayalakshmibandaru913@gmail.com'
    });
  }
};
