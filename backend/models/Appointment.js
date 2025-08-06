import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: String,
  userId: String,
  date: String
});

export default mongoose.model("Appointment", appointmentSchema);
