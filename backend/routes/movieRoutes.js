const express = require("express")

const {
  getMovies,
  getMovie
} = require("../controllers/movieController")

const router = express.Router()

router.get("/", getMovies)

router.get("/:id", getMovie)

module.exports = router