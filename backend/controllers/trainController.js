const Train = require("../models/Train")
const TrainBooking =
  require("../models/TrainBooking")

const createTrain = async (
  req,
  res
) => {
  try {
    const train =
      await Train.create(req.body)

    res.status(201).json(train)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getTrains = async (
  req,
  res
) => {
  try {
    const trains =
      await Train.find()

    res.json(trains)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteTrain = async (
  req,
  res
) => {
  try {
    await Train.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message: "Train Deleted"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const bookTrain = async (
  req,
  res
) => {
  try {
    const {
      trainId,
      passengers
    } = req.body

    const train =
      await Train.findById(trainId)

    if (!train) {
      return res.status(404).json({
        message:
          "Train not found"
      })
    }

    if (
      train.seatsAvailable <
      passengers
    ) {
      return res.status(400).json({
        message:
          "Not enough seats"
      })
    }

    const booking =
      await TrainBooking.create({
        user: req.user._id,
        train: trainId,
        passengers,
        totalAmount:
          train.price *
          passengers
      })

    train.seatsAvailable =
      train.seatsAvailable -
      passengers

    await train.save()

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

module.exports = {
  createTrain,
  getTrains,
  deleteTrain,
  bookTrain
}