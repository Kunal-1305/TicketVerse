const FlightBooking = require("../models/FlightBooking")
const Flight = require("../models/Flight")

const getBookings = async (req, res) => {
  try {
    const bookings = await FlightBooking.find({
      user: req.user._id
    }).populate("flight")

    res.json(bookings)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const cancelFlightBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await FlightBooking.findById(
        req.params.id
      )

    if (!booking) {
      return res.status(404).json({
        message:
          "Booking not found"
      })
    }

    if (
      booking.status ===
      "Cancelled"
    ) {
      return res.status(400).json({
        message:
          "Booking already cancelled"
      })
    }

    const flight =
      await Flight.findById(
        booking.flight
      )

    if (flight) {
      flight.seatsAvailable +=
        booking.passengers

      await flight.save()
    }

    booking.status =
      "Cancelled"

    await booking.save()

    res.json({
      message:
        "Flight Booking Cancelled"
    })
  } catch (error) {
    res.status(500).json({
      message:
        error.message
    })
  }
}

module.exports = {
  getBookings,
  cancelFlightBooking
}