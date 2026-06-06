const FlightBooking = require("../models/FlightBooking")
const TrainBooking = require("../models/TrainBooking")
const MovieBooking = require("../models/MovieBooking")

const getAllBookings = async (
  req,
  res
) => {
  try {
    const flights =
      await FlightBooking.find()
        .populate("user", "name email")
        .populate("flight")

    const trains =
      await TrainBooking.find()
        .populate("user", "name email")
        .populate("train")

    const movies =
      await MovieBooking.find()
        .populate("user", "name email")
        .populate("movie")

    res.json({
      flights,
      trains,
      movies
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