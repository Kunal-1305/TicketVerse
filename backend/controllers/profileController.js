const User = require("../models/User")
const FlightBooking =
  require("../models/FlightBooking")
const TrainBooking =
  require("../models/TrainBooking")
const MovieBooking =
  require("../models/MovieBooking")

const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user._id
      )

    const flightBookings =
      await FlightBooking.countDocuments(
        {
          user: req.user._id
        }
      )

    const trainBookings =
      await TrainBooking.countDocuments(
        {
          user: req.user._id
        }
      )

    const movieBookings =
      await MovieBooking.countDocuments(
        {
          user: req.user._id
        }
      )

    const flights =
      await FlightBooking.find({
        user: req.user._id
      })

    const trains =
      await TrainBooking.find({
        user: req.user._id
      })

    const movies =
      await MovieBooking.find({
        user: req.user._id
      })

    const totalSpent =
      [...flights,
       ...trains,
       ...movies]
      .reduce(
        (sum, booking) =>
          sum +
          booking.totalAmount,
        0
      )

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt:
        user.createdAt,
      flightBookings,
      trainBookings,
      movieBookings,
      totalSpent
    })
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    })
  }
}

module.exports = {
  getProfile
}