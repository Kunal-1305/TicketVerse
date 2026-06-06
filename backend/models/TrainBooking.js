const mongoose = require("mongoose")

const trainBookingSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      train: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Train",
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
  "TrainBooking",
  trainBookingSchema
)