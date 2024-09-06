import { Bed } from "../models/Bed.js";
import { Hospital } from "../models/Hospital.js";


export const getBedByType=async (req, res) => {
    const { type } = req.query; // Expecting a query parameter for bed type
  
    try {
     
      const ICUCount = await Bed.countDocuments({ type: "ICU" });
    const GeneralCount = await Bed.countDocuments({ type: "General" });
    const PrivateCount = await Bed.countDocuments({ type: "Private" });
    const SemiPrivateCount = await Bed.countDocuments({ type: "Semi-Private" });
    const EmergencyCount = await Bed.countDocuments({ type: "Emergency" });
   console.log(ICUCount)
    res.status(200).json([
      { type: "ICU", count: ICUCount },
      { type: "General", count: GeneralCount},
      
      { type: "Emergency", count: EmergencyCount },
    ]);
  
      
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }

  export const createBed=async (req, res) => {
    const { hospitalName, type, isAvailable } = req.body;
    
    // Input validation
    if (!hospitalName || !type ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {

        const hospital=await Hospital.findOne({name:hospitalName})
        console.log(hospital)
        if(!hospital)
            return res.status(400).json({ message: 'No such hospital found' });
       
      const newBed = new Bed({
        hospital:hospital._id,
        type,
        isAvailable,
      });
  
      // Save the new bed to the database
      const savedBed = await newBed.save();
      
      res.status(201).json(savedBed); // 201 Created
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }