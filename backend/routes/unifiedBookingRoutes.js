const express = require("express")

const protect =
  require("../middleware/authMiddleware")

const {
  getAllBookings
} = require(
  "../controllers/unifiedBookingController"
)

const router = express.Router()

router.get(
  "/",
  protect,
  getAllBookings
)

module.exports = router