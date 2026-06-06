const mongoose = require("mongoose")
const dotenv = require("dotenv")

const Flight = require("./models/Flight")
const Train = require("./models/Train")
const Movie = require("./models/Movie")

const flights = require("./data/flights")
const trains = require("./data/trains")
const movies = require("./data/movies")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const seedData = async () => {
  try {
    await Flight.deleteMany()
    await Train.deleteMany()
    await Movie.deleteMany()

    await Flight.insertMany(flights)
    await Train.insertMany(trains)
    await Movie.insertMany(movies)

    console.log("Flights Seeded")
    console.log("Trains Seeded")
    console.log("Movies Seeded")

    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seedData()