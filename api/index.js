const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

let connectionPromise = null;
function connectDB() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    }).catch((err) => {
      connectionPromise = null;
      throw err;
    });
  }
  return connectionPromise;
}

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
