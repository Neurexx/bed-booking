import {Schema, model} from "mongoose";

const BookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bed: { type: Schema.Types.ObjectId, ref: 'Bed', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' }
  });
  
  export const Booking = model('Booking', BookingSchema);

