const mongoose = require("mongoose")

const trainSchema = new mongoose.Schema(
  {
    trainNumber: {
      type: String,
      required: true
    },
    trainName: {
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

module.exports = mongoose.model(
  "Train",
  trainSchema
)