require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// ── DB connection (reused across warm invocations) ──────────────────────────
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// ── App ─────────────────────────────────────────────────────────────────────
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Connect DB before every request ─────────────────────────────────────────
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',         require('../server/routes/authRoutes'));
app.use('/api/gallery',      require('../server/routes/galleryRoutes'));
app.use('/api/amenities',    require('../server/routes/amenityRoutes'));
app.use('/api/enquiries',    require('../server/routes/enquiryRoutes'));
app.use('/api/testimonials', require('../server/routes/testimonialRoutes'));
app.use('/api/faqs',         require('../server/routes/faqRoutes'));
app.use('/api/content',      require('../server/routes/contentRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Royal Blue PG API is running', timestamp: new Date() });
});

// ── Error handler ────────────────────────────────────────────────────────────
app.use(require('../server/middleware/errorHandler'));

module.exports = app;
