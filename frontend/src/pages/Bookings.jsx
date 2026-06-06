import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function Bookings() {
  const [data, setData] = useState(null)
  const [activeTab, setActiveTab] =
    useState("all")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      const response = await api.get(
        "/all-bookings",
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelMovie = async (id) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      await api.put(
        `/movie-bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      fetchBookings()
    } catch (error) {
      console.log(error)
    }
  }

  const cancelFlight = async (
    id
  ) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      await api.put(
        `/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      fetchBookings()
    } catch (error) {
      console.log(error)
    }
  }

  const cancelTrain = async (
    id
  ) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      await api.put(
        `/trains/cancel/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      fetchBookings()
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return (
      <MainLayout>
        Loading...
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() =>
            setActiveTab("all")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setActiveTab("flights")
          }
        >
          Flights
        </button>

        <button
          onClick={() =>
            setActiveTab("trains")
          }
        >
          Trains
        </button>

        <button
          onClick={() =>
            setActiveTab("movies")
          }
        >
          Movies
        </button>
      </div>

      {(activeTab === "all" ||
        activeTab === "flights") &&
        data.flights.map(
          (booking) => (
            <div
              key={booking._id}
              className="shadow p-4 rounded mb-4"
            >
              <h2>
                Flight:
                {" "}
                {
                  booking.flight
                    ?.airline
                }
              </h2>

              <p>
                {
                  booking.flight
                    ?.source
                }
                {" → "}
                {
                  booking.flight
                    ?.destination
                }
              </p>

              <p>
                Status:
                {" "}
                {booking.status}
              </p>

              <p>
                ₹
                {
                  booking.totalAmount
                }
              </p>

              {booking.status ===
                "Booked" && (
                <button
                  onClick={() =>
                    cancelFlight(
                      booking._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )
        )}

      {(activeTab === "all" ||
        activeTab === "trains") &&
        data.trains.map(
          (booking) => (
            <div
              key={booking._id}
              className="shadow p-4 rounded mb-4"
            >
              <h2>
                Train:
                {" "}
                {
                  booking.train
                    ?.trainName
                }
              </h2>

              <p>
                {
                  booking.train
                    ?.source
                }
                {" → "}
                {
                  booking.train
                    ?.destination
                }
              </p>

              <p>
                Status:
                {" "}
                {booking.status}
              </p>

              <p>
                ₹
                {
                  booking.totalAmount
                }
              </p>

              {booking.status ===
                "Booked" && (
                <button
                  onClick={() =>
                    cancelTrain(
                      booking._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )
        )}

      {(activeTab === "all" ||
        activeTab === "movies") &&
        data.movies.map(
          (booking) => (
            <div
              key={booking._id}
              className="shadow p-4 rounded mb-4"
            >
              <h2>
                Movie:
                {" "}
                {
                  booking.movie
                    ?.movieName
                }
              </h2>

              <p>
                Seats:
                {" "}
                {booking.seats.join(
                  ", "
                )}
              </p>

              <p>
                Status:
                {" "}
                {booking.status}
              </p>

              <p>
                ₹
                {
                  booking.totalAmount
                }
              </p>

              {booking.status ===
                "Booked" && (
                <button
                  onClick={() =>
                    cancelMovie(
                      booking._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )
        )}
    </MainLayout>
  )
}

export default Bookings