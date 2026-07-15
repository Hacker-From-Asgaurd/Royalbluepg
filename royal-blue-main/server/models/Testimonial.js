const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, default: '' },
  photoPublicId: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  college: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, bufferCommands: false });

module.exports = mongoose.model('Testimonial', testimonialSchema);
