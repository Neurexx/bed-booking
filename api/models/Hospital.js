import mongoose from "mongoose";
const HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity:{type:Number},
    
    
  });
  
  export const Hospital = mongoose.model('Hospital', HospitalSchema);