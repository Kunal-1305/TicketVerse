const express = require("express")

const {
  getAllBookings
} = require(
  "../controllers/adminBookingController"
)

const router = express.Router()

router.get(
  "/",
  getAllBookings
)

module.exports = router