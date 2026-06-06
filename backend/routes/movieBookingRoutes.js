const express = require("express")

const protect =
  require("../middleware/authMiddleware")

const {
  bookMovie,
  getBookedSeats,
  cancelMovieBooking
} = require(
  "../controllers/movieBookingController"
)

const router = express.Router()

router.post(
  "/",
  protect,
  bookMovie
)

router.get(
  "/seats/:id",
  getBookedSeats
)

router.put(
  "/cancel/:id",
  protect,
  cancelMovieBooking
)

module.exports = router