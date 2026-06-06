const express = require("express")

const protect =
  require("../middleware/authMiddleware")

const {
  getBookings,
  cancelFlightBooking
} = require(
  "../controllers/bookingController"
)

const router = express.Router()

router.get(
  "/",
  protect,
  getBookings
)

router.put(
  "/cancel/:id",
  protect,
  cancelFlightBooking
)

module.exports = router