const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  college: { type: String, trim: true },
  occupation: { type: String, enum: ['Student', 'Working Professional', 'Other'], default: 'Student' },
  roomPreference: { type: String, enum: ['Double Sharing', 'Triple Sharing', 'Premium AC Room', 'Any'] },
  moveInDate: { type: Date },
  duration: { type: String },
  message: { type: String },
  privacyPolicy: { type: Boolean, default: false },
  status: { type: String, default: 'new', enum: ['new', 'contacted', 'resolved', 'rejected'] },
}, { timestamps: true, bufferTimeoutMS: 25000 });

module.exports = mongoose.model('Enquiry', enquirySchema);
