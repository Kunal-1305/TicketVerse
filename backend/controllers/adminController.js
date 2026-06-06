const User = require("../models/User")
const Flight = require("../models/Flight")
const FlightBooking = require("../models/FlightBooking")

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()

    const totalFlights =
      await Flight.countDocuments()

    const totalBookings =
      await FlightBooking.countDocuments()

    const bookings =
      await FlightBooking.find()

    const revenue = bookings.reduce(
      (total, booking) =>
        total + booking.totalAmount,
      0
    )

    res.json({
      totalUsers,
      totalFlights,
      totalBookings,
      revenue
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getDashboardStats
}