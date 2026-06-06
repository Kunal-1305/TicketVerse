const mongoose = require("mongoose")

const movieBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    seats: [
      {
        type: String
      }
    ],
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
  "MovieBooking",
  movieBookingSchema
)