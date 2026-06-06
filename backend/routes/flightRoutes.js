const express = require("express")

const {
  createFlight,
  getFlights,
  deleteFlight,
  bookFlight
} = require("../controllers/flightController")

const protect = require("../middleware/authMiddleware")

const router =
  express.Router()

router.post(
  "/",
  createFlight
)

router.get(
  "/",
  getFlights
)

router.delete(
  "/:id",
  deleteFlight
)

router.post(
  "/book",
  protect,
  bookFlight
)

module.exports = router