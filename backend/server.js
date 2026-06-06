const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const flightRoutes = require("./routes/flightRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const adminRoutes = require("./routes/adminRoutes")
const trainRoutes = require("./routes/trainRoutes")
const movieRoutes = require("./routes/movieRoutes")
const movieBookingRoutes = require("./routes/movieBookingRoutes")
const unifiedBookingRoutes = require("./routes/unifiedBookingRoutes")
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes")
const profileRoutes = require("./routes/profileRoutes")
const adminUserRoutes = require("./routes/adminUserRoutes")
const adminBookingRoutes = require("./routes/adminBookingRoutes")

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api/users", userRoutes)

app.use("/api/flights", flightRoutes)

app.use("/api/bookings", bookingRoutes)

app.use("/api/admin", adminRoutes)

app.use("/api/trains", trainRoutes)

app.use("/api/movies", movieRoutes)

app.use("/api/movie-bookings", movieBookingRoutes)

app.use("/api/all-bookings",unifiedBookingRoutes)

app.use(
  "/api/admin/analytics",
  adminAnalyticsRoutes
)

app.use(
  "/api/profile",
  profileRoutes
)

app.use(
  "/api/admin/users",
  adminUserRoutes
)

app.use(
  "/api/admin/bookings",
  adminBookingRoutes
)

app.get("/", (req, res) => {
  res.send("TicketVerse API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})