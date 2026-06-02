const UserBooking = require('../db/User/MyBookings');

exports.orderProduct = async (req, res) => {
  try {
    const booking = new UserBooking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booked successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await UserBooking.find({ userId }).sort('position');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};