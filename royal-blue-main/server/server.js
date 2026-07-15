require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static uploads folder (dev fallback)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/amenities', require('./routes/amenityRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Royal Blue PG API is running', timestamp: new Date() });
});

// Test email route (remove after testing)
app.get('/api/test-email', async (req, res) => {
  try {
    const transporter = require('./config/email');
    await transporter.sendMail({
      from: `"Royal Blue PG" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email - Royal Blue PG',
      html: '<p>Email is working correctly!</p>',
    });
    res.json({ success: true, message: `Test email sent to ${process.env.ADMIN_EMAIL}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🏠 Royal Blue PG Server running on port ${PORT}`);
});
