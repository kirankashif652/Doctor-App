import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import Doctor from "./models/Doctor.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ CORS Configuration 
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// ✅ Additional CORS headers 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ 404 Handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`
  });
});

// ✅ Simple Error Handler
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error.message);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    
  
    await Doctor.deleteMany({});
    console.log("🧹 Cleared existing doctors");
    
    
    const doctorsToSeed = [
      { 
        name: " Ahmed Hassan", 
        specialization: "Cardiologist",
        email: "ahmed.hassan@cardio.pk",
        phone: "+92-300-1234567",
        experience: 15,
        consultationFee: 3000,
        availability: "Mon-Fri 9AM-5PM"
      },
      { 
        name: " Sara Khan", 
        specialization: "Dentist",
        email: "sara.khan@dental.pk",
        phone: "+92-301-2345678",
        experience: 8,
        consultationFee: 2000,
        availability: "Mon-Sat 10AM-6PM"
      },
      { 
        name: " Ali Raza", 
        specialization: "Neurologist",
        email: "ali.raza@neuro.pk",
        phone: "+92-302-3456789",
        experience: 12,
        consultationFee: 3500,
        availability: "Tue-Sat 11AM-7PM"
      },
      {
        name: " Fatima Sheikh",
        specialization: "Pediatrician", 
        email: "fatima.sheikh@kids.pk",
        phone: "+92-303-4567890",
        experience: 10,
        consultationFee: 2500,
        availability: "Mon-Fri 8AM-4PM"
      },
      {
        name: " Muhammad Asif",
        specialization: "Orthopedic Surgeon",
        email: "asif.ortho@bones.pk", 
        phone: "+92-304-5678901",
        experience: 18,
        consultationFee: 4000,
        availability: "Mon-Thu 2PM-8PM"
      },
      {
        name: " Ayesha Malik",
        specialization: "Dermatologist",
        email: "ayesha.malik@skin.pk",
        phone: "+92-305-6789012", 
        experience: 7,
        consultationFee: 2200,
        availability: "Tue-Sat 9AM-5PM"
      },
      {
        name: " Hassan Ali",
        specialization: "General Surgeon",
        email: "hassan.surgery@general.pk",
        phone: "+92-306-7890123",
        experience: 20,
        consultationFee: 3800,
        availability: "Mon-Wed-Fri 3PM-9PM"
      },
      {
        name: " Zainab Ahmed",
        specialization: "Gynecologist", 
        email: "zainab.ahmed@women.pk",
        phone: "+92-307-8901234",
        experience: 14,
        consultationFee: 3200,
        availability: "Mon-Sat 10AM-6PM"
      },
      {
        name: "Tariq Mahmood",
        specialization: "ENT Specialist",
        email: "tariq.ent@throat.pk",
        phone: "+92-308-9012345",
        experience: 16,
        consultationFee: 2800,
        availability: "Tue-Thu-Sat 11AM-7PM"
      },
      {
        name: " Sadia Khatoon",
        specialization: "Psychiatrist",
        email: "sadia.mind@mental.pk", 
        phone: "+92-309-0123456",
        experience: 9,
        consultationFee: 3500,
        availability: "Mon-Fri 1PM-7PM"
      },
      {
        name: " Imran Sheikh",
        specialization: "Urologist",
        email: "imran.urology@kidney.pk",
        phone: "+92-310-1234567",
        experience: 13,
        consultationFee: 3300,
        availability: "Mon-Wed-Fri 10AM-6PM"
      },
      {
        name: " Rabia Noor",
        specialization: "Ophthalmologist",
        email: "rabia.eyes@vision.pk",
        phone: "+92-311-2345678",
        experience: 11,
        consultationFee: 2600,
        availability: "Tue-Sat 9AM-5PM"
      }
    ];
    
    await Doctor.insertMany(doctorsToSeed);
    console.log(`🌱 ${doctorsToSeed.length} doctors seeded successfully`);
    

    const specializations = [...new Set(doctorsToSeed.map(doc => doc.specialization))];
    console.log(`🏥 Available specializations: ${specializations.join(', ')}`);
    
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// ✅ Start Server - Simple approach
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch(error => {
  console.error("❌ Failed to start server:", error);
});