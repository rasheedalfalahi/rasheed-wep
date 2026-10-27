import express from 'express';
import path from 'path';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route for contact form
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'الرجاء إكمال جميع الحقول' });
    }

    // Check if email credentials are provided via environment variables or fallback
    let emailUser = (process.env.EMAIL_USER && process.env.EMAIL_USER.trim()) || '';
    let rawPass = (process.env.EMAIL_PASS && process.env.EMAIL_PASS.trim()) || '';

    // If the environment variables are missing, invalid, or empty, use the provided working credentials as the fallback
    if (!emailUser || !emailUser.includes('@')) {
      emailUser = 'rasheedalfalahi778@gmail.com';
    }
    
    // Clean any spaces from the password (Google displays it as 4-word groups, e.g. "mozb bska djbi znfa")
    let emailPass = rawPass.replace(/\s+/g, '');
    if (!emailPass || emailPass.length < 16) {
      emailPass = 'mozbbskadjbiznfa'; // Cleaned 16-character password 'mozb bska djbi znfa'
    }

    if (!emailUser || !emailPass) {
      console.log('--- MISSING EMAIL CREDENTIALS ---');
      console.log('Form Submission:', { name, email, message });
      return res.status(200).json({ 
        success: true, 
        message: 'تم استلام طلبك بنجاح! (ملاحظة للمطور: يرجى إعداد EMAIL_USER و EMAIL_PASS في الإعدادات لإرسال بريد حقيقي)' 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: emailUser,
        to: 'rasheedalfalahi778@gmail.com',
        subject: `طلب جديد من: ${name}`,
        text: `الاسم: ${name}\nالبريد الإلكتروني للعميل: ${email}\n\nالرسالة:\n${message}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'تم إرسال طلبك بنجاح!' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      const errorMsg = error?.message || '';
      if (errorMsg.includes('535') || errorMsg.includes('Invalid login') || errorMsg.includes('Username and Password not accepted')) {
        return res.status(401).json({ 
          error: 'خطأ في تسجيل الدخول (535): لم يتم قبول البريد الإلكتروني أو كلمة المرور. يرجى التأكد من استخدام "كلمة مرور التطبيق" (App Password) المكونة من 16 حرفاً من حساب Google وليس كلمة المرور العادية لبريدك.' 
        });
      }
      
      res.status(500).json({ error: 'حدث خطأ أثناء إرسال البريد. حاول مرة أخرى لاحقاً.' });
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
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
