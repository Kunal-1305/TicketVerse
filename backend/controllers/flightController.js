const Flight = require("../models/Flight")
const FlightBooking = require("../models/FlightBooking")

const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(
      req.body
    )

    res.status(201).json(flight)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getFlights = async (req, res) => {
  try {
    const flights =
      await Flight.find()

    res.json(flights)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteFlight = async (
  req,
  res
) => {
  try {
    await Flight.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message:
        "Flight Deleted"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const bookFlight = async (
  req,
  res
) => {
  try {
    const {
      flightId,
      passengers
    } = req.body

    const flight =
      await Flight.findById(
        flightId
      )

    if (!flight) {
      return res.status(404).json({
        message:
          "Flight not found"
      })
    }

    if (
      flight.seatsAvailable <
      passengers
    ) {
      return res.status(400).json({
        message:
          "Not enough seats"
      })
    }

    const booking =
      await FlightBooking.create({
        user: req.user._id,
        flight: flightId,
        passengers,
        totalAmount:
          flight.price *
          passengers
      })

    flight.seatsAvailable =
      flight.seatsAvailable -
      passengers

    await flight.save()

    res.status(201).json(
      booking
    )
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    })
  }
}

module.exports = {
  createFlight,
  getFlights,
  deleteFlight,
  bookFlight
}