import { Hospital } from "../models/Hospital.js";

export const createHospital = async (req, res) => {
    const { name, location, capacity } = req.body;
  
    if (!name || !location || !capacity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const newHospital = new Hospital({
        name,
        location,
        capacity,
        bedsAvailable: capacity, // Assuming all beds are available initially
      });
  
      const savedHospital = await newHospital.save();
      res.status(201).json(savedHospital);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Get all hospitals
 export  const getHospitals = async (req, res) => {
    try {
      const hospitals = await Hospital.find().populate('beds');
      res.status(200).json(hospitals);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Get a hospital by ID
 export  const getHospitalById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const hospital = await Hospital.findById(id).populate('beds');
      
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
  
      res.status(200).json(hospital);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Update hospital details
  export const updateHospital = async (req, res) => {
    const { id } = req.params;
    const { name, location, capacity } = req.body;
  
    try {
      const updatedHospital = await Hospital.findByIdAndUpdate(
        id,
        { name, location, capacity },
        { new: true }
      );
  
      if (!updatedHospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
  
      res.status(200).json(updatedHospital);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Delete a hospital
 export  const deleteHospital = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedHospital = await Hospital.findByIdAndDelete(id);
  
      if (!deletedHospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
  
      res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };