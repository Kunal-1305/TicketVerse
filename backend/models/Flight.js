const mongoose = require("mongoose")

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true
    },
    airline: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    departureTime: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    seatsAvailable: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Flight", flightSchema)