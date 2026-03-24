import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API endpoint to send order confirmation email
  app.post('/api/orders/email', async (req, res) => {
    try {
      const { orderId, customer, items, total } = req.body;

      // Create a test account if no SMTP credentials are provided
      // In production, use real SMTP credentials from environment variables
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
          pass: process.env.SMTP_PASS || 'ethereal.pass',
        },
      });

      // Generate ethereal test account if no env vars
      if (!process.env.SMTP_HOST) {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      }

      const itemsHtml = items.map((item: any) => 
        `<li>${item.quantity}x ${item.name.en || item.name} (${item.selectedColor}, ${item.selectedSize}) - €${item.price * item.quantity}</li>`
      ).join('');

      const mailOptions = {
        from: '"Natial Store" <noreply@natial.com>',
        to: customer.email,
        subject: `Order Confirmation - #${orderId}`,
        html: `
          <h1>Thank you for your order, ${customer.name}!</h1>
          <p>We have received your order and are preparing it for production.</p>
          <h2>Order Details:</h2>
          <ul>${itemsHtml}</ul>
          <h3>Total: €${total}</h3>
          <br/>
          <h3>Shipping Address:</h3>
          <p>${customer.address}<br/>${customer.city}, ${customer.postalCode}<br/>${customer.country}</p>
          <p>Phone: ${customer.phone}</p>
          <br/>
          <p>We will notify you once your order is shipped.</p>
          <p>Best regards,<br/>The Natial Team</p>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      if (!process.env.SMTP_HOST) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }

      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
