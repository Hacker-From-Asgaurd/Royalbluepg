const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true }, // e.g., 'hero', 'about', 'contact'
  key: { type: String, required: true },     // e.g., 'title', 'subtitle', 'phone'
  value: { type: String, required: true },
}, { timestamps: true, bufferCommands: false });

// Compound unique index
contentSchema.index({ section: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);
