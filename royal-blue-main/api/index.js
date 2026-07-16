require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../server/config/db');
const errorHandler = require('../server/middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('../server/routes/authRoutes'));
app.use('/api/gallery', require('../server/routes/galleryRoutes'));
app.use('/api/amenities', require('../server/routes/amenityRoutes'));
app.use('/api/enquiries', require('../server/routes/enquiryRoutes'));
app.use('/api/testimonials', require('../server/routes/testimonialRoutes'));
app.use('/api/faqs', require('../server/routes/faqRoutes'));
app.use('/api/content', require('../server/routes/contentRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Royal Blue PG API is running' });
});

app.use(errorHandler);

module.exports = app;
