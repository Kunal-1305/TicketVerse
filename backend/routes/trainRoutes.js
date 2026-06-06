const express = require("express")

const {
  createTrain,
  getTrains,
  deleteTrain,
  bookTrain
} = require(
  "../controllers/trainController"
)

const protect =
  require("../middleware/authMiddleware")

const router =
  express.Router()

router.post(
  "/",
  createTrain
)

router.get(
  "/",
  getTrains
)

router.delete(
  "/:id",
  deleteTrain
)

router.post(
  "/book",
  protect,
  bookTrain
)

module.exports = router