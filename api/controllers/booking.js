const Booking = require('../models/Booking');
const Bed = require('../models/Bed');
const User = require('../models/User');
const Hospital = require('../models/Hospital');

// Create a new booking
const createBooking = async (req, res) => {
  const { userId, bedId, hospitalId, startDate, endDate } = req.body;

  // Input validation
  if (!userId || !bedId || !hospitalId || !startDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the bed exists and is available
    const bed = await Bed.findById(bedId);
    if (!bed) {
      return res.status(404).json({ message: 'Bed not found' });
    }
    if (!bed.isAvailable) {
      return res.status(400).json({ message: 'Bed is not available' });
    }

    // Create new booking
    const newBooking = new Booking({
      user: userId,
      bed: bedId,
      hospital: hospitalId,
      startDate,
      endDate,
      status: 'booked',
    });

    const savedBooking = await newBooking.save();

    // Update bed availability
    bed.isAvailable = false;
    await bed.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('bed')
      .populate('hospital', 'name location');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id)
      .populate('user', 'name email')
      .populate('bed')
      .populate('hospital', 'name location');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bookings by user
const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  // Ensure only the user or an admin can access
  if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const bookings = await Booking.find({ user: userId })
      .populate('bed')
      .populate('hospital', 'name location');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { endDate, status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only the user who made the booking or an admin can update
    if (req.user.role !== 'admin' && req.user._id.toString() !== booking.user.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update fields
    if (endDate) booking.endDate = endDate;
    if (status) booking.status = status;

    const updatedBooking = await booking.save();
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only the user who made the booking or an admin can cancel
    if (req.user.role !== 'admin' && req.user._id.toString() !== booking.user.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Update bed availability
    const bed = await Bed.findById(booking.bed);
    if (bed) {
      bed.isAvailable = true;
      await bed.save();
    }

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a booking (admin only)
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  // Only admins can delete bookings
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update bed availability
    const bed = await Bed.findById(booking.bed);
    if (bed) {
      bed.isAvailable = true;
      await bed.save();
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
  cancelBooking,
  deleteBooking,
};
