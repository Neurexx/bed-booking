import mongoose from "mongoose";

const BedSchema = new mongoose.Schema({
    type: { type: String, enum: ['ICU', 'General', 'Private', 'Semi-Private','Emergency'], required: true },
    isAvailable: { type: Boolean, default: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true }
  });
  
  export const Bed = mongoose.model('Bed', BedSchema);