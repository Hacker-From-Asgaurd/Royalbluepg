const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String }, // Cloudinary public ID for deletion
  category: {
    type: String,
    required: true,
    enum: ['Rooms', 'Kitchen', 'Washroom', 'Building', 'Reception', 'Study Area', 'Outdoor'],
  },
  caption: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true, bufferCommands: false });

module.exports = mongoose.model('Gallery', gallerySchema);
