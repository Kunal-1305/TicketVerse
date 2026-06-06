const User = require("../models/User")
const FlightBooking = require("../models/FlightBooking")
const TrainBooking = require("../models/TrainBooking")
const MovieBooking = require("../models/MovieBooking")

const getAnalytics = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments()

    const activeUsers =
      await User.countDocuments({
        role: "user",
        isBlocked: false
      })

    const blockedUsers =
      await User.countDocuments({
        role: "user",
        isBlocked: true
      })

    const flights =
      await FlightBooking.find()

    const trains =
      await TrainBooking.find()

    const movies =
      await MovieBooking.find()

    const flightRevenue =
      flights.reduce(
        (sum, booking) =>
          sum +
          booking.totalAmount,
        0
      )

    const trainRevenue =
      trains.reduce(
        (sum, booking) =>
          sum +
          booking.totalAmount,
        0
      )

    const movieRevenue =
      movies.reduce(
        (sum, booking) =>
          sum +
          booking.totalAmount,
        0
      )

    const totalRevenue =
      flightRevenue +
      trainRevenue +
      movieRevenue

    res.json({
      totalUsers,
      activeUsers,
      blockedUsers,

      totalFlights:
        flights.length,

      totalTrains:
        trains.length,

      totalMovies:
        movies.length,

      flightRevenue,
      trainRevenue,
      movieRevenue,

      totalRevenue
    })
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    })
  }
}

module.exports = {
  getAnalytics
}