const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

function connectDB() {
  if (cached.conn) return Promise.resolve(cached.conn);
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 25000,
      connectTimeoutMS: 25000,
    }).then((conn) => { cached.conn = conn; return conn; });
  }
  return cached.promise;
}

// Start connecting immediately at module load (warm up on cold start)
connectDB().catch((err) => console.error('Initial DB connect error:', err.message));

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed: ' + err.message });
  }
});

app.get('/api/debug', (req, res) => {
  res.json({ state: mongoose.connection.readyState, hasUri: !!process.env.MONGO_URI });
});

app.use('/api/auth',         require('../royal-blue-main/server/routes/authRoutes'));
app.use('/api/gallery',      require('../royal-blue-main/server/routes/galleryRoutes'));
app.use('/api/amenities',    require('../royal-blue-main/server/routes/amenityRoutes'));
app.use('/api/enquiries',    require('../royal-blue-main/server/routes/enquiryRoutes'));
app.use('/api/testimonials', require('../royal-blue-main/server/routes/testimonialRoutes'));
app.use('/api/faqs',         require('../royal-blue-main/server/routes/faqRoutes'));
app.use('/api/content',      require('../royal-blue-main/server/routes/contentRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Royal Blue PG API is running', timestamp: new Date() });
});

app.get('/api/test-email', async (req, res) => {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: `"Royal Blue PG" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email - Royal Blue PG',
      html: '<p>Email is working!</p>',
    });
    res.json({ success: true, message: `Email sent to ${process.env.ADMIN_EMAIL}`, smtp: process.env.SMTP_HOST, user: process.env.SMTP_USER });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, smtp: process.env.SMTP_HOST, user: process.env.SMTP_USER });
  }
});

app.use(require('../royal-blue-main/server/middleware/errorHandler'));

module.exports = app;
