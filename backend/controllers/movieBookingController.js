const Movie = require("../models/Movie")
const MovieBooking = require("../models/MovieBooking")

const getBookedSeats = async (
  req,
  res
) => {
  try {
    const bookings =
      await MovieBooking.find({
        movie: req.params.id,
        status: "Booked"
      })

    const bookedSeats =
      bookings.flatMap(
        (booking) => booking.seats
      )

    res.json(bookedSeats)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const bookMovie = async (
  req,
  res
) => {
  try {
    const { movieId, seats } =
      req.body

    const movie =
      await Movie.findById(movieId)

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      })
    }

    const existingBookings =
      await MovieBooking.find({
        movie: movieId,
        status: "Booked"
      })

    const bookedSeats =
      existingBookings.flatMap(
        (booking) => booking.seats
      )

    const alreadyBooked =
      seats.some((seat) =>
        bookedSeats.includes(seat)
      )

    if (alreadyBooked) {
      return res.status(400).json({
        message:
          "Some seats already booked"
      })
    }

    const booking =
      await MovieBooking.create({
        user: req.user._id,
        movie: movieId,
        seats,
        totalAmount:
          seats.length * 250
      })

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

const cancelMovieBooking =
  async (req, res) => {
    try {
      const booking =
        await MovieBooking.findById(
          req.params.id
        )

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found"
        })
      }

      booking.status =
        "Cancelled"

      await booking.save()

      res.json({
        message:
          "Booking Cancelled"
      })
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      })
    }
  }

module.exports = {
  bookMovie,
  getBookedSeats,
  cancelMovieBooking
}