import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function MovieSeats() {
  const { id } = useParams()

  const [selectedSeats, setSelectedSeats] =
    useState([])

  const [bookedSeats, setBookedSeats] =
    useState([])

  useEffect(() => {
    fetchBookedSeats()
  }, [])

  const fetchBookedSeats =
    async () => {
      const { data } =
        await api.get(
          `/movie-bookings/seats/${id}`
        )

      setBookedSeats(data)
    }

  const seats = [
    "A1","A2","A3","A4","A5",
    "B1","B2","B3","B4","B5",
    "C1","C2","C3","C4","C5",
    "D1","D2","D3","D4","D5"
  ]

  const toggleSeat = (seat) => {
    if (
      bookedSeats.includes(seat)
    ) {
      return
    }

    if (
      selectedSeats.includes(seat)
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) => s !== seat
        )
      )
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat
      ])
    }
  }

  const bookMovie = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      await api.post(
        "/movie-bookings",
        {
          movieId: id,
          seats: selectedSeats
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      alert(
        "Movie Ticket Booked"
      )

      fetchBookedSeats()

      setSelectedSeats([])
    } catch (error) {
      alert(
        error.response.data.message
      )
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Select Seats
      </h1>

      <div className="bg-gray-300 h-4 rounded mb-10 max-w-md"></div>

      <p className="mb-6">
        Screen
      </p>

      <div className="grid grid-cols-5 gap-3 max-w-md">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() =>
              toggleSeat(seat)
            }
            disabled={bookedSeats.includes(
              seat
            )}
            className={`p-3 border rounded ${
              bookedSeats.includes(
                seat
              )
                ? "bg-red-500 text-white"
                : selectedSeats.includes(
                    seat
                  )
                ? "bg-green-500 text-white"
                : ""
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <p>
          Seats:
          {" "}
          {selectedSeats.length}
        </p>

        <p>
          Total:
          {" "}
          ₹
          {selectedSeats.length *
            250}
        </p>

        <button
          onClick={bookMovie}
          className="bg-black text-white px-4 py-2 mt-4 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </MainLayout>
  )
}

export default MovieSeats