const FlightBooking = require("../models/FlightBooking")
const TrainBooking = require("../models/TrainBooking")
const MovieBooking = require("../models/MovieBooking")

const getAllBookings = async (req, res) => {
  try {
    const flightBookings =
      await FlightBooking.find({
        user: req.user._id
      }).populate("flight")

    const trainBookings =
      await TrainBooking.find({
        user: req.user._id
      }).populate("train")

    const movieBookings =
      await MovieBooking.find({
        user: req.user._id
      }).populate("movie")

    res.json({
      flights: flightBookings,
      trains: trainBookings,
      movies: movieBookings
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAllBookings
}