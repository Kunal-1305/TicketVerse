const express = require("express")

const {
  getAnalytics
} = require(
  "../controllers/adminAnalyticsController"
)

const router = express.Router()

router.get("/", getAnalytics)

module.exports = router