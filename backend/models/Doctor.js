import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  // ✅ Basic Information (Keep simple for now)
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  specialization: {
    type: String,
    required: true,
    trim: true
  },

  // ✅ Optional fields (won't break if missing)
  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  phone: {
    type: String,
    trim: true
  },

  experience: {
    type: Number,
    default: 5
  },

  consultationFee: {
    type: Number,
    default: 2000
  },

  availability: {
    type: String,
    default: "Mon-Fri 9AM-5PM"
  },

  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true // Adds createdAt and updatedAt
});

export default mongoose.model("Doctor", doctorSchema);