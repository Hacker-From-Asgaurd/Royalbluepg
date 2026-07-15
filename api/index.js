const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Single connection promise — no .catch() so errors propagate
const dbPromise = mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 25000,
  connectTimeoutMS: 25000,
});

app.use(async (req, res, next) => {
  try {
    await dbPromise;
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

app.use(require('../royal-blue-main/server/middleware/errorHandler'));

module.exports = app;
