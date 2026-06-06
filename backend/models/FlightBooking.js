const mongoose = require("mongoose")

const flightBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true
    },
    passengers: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: "Booked"
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  "FlightBooking",
  flightBookingSchema
)