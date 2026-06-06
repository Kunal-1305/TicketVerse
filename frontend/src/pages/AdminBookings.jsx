import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function AdminBookings() {
  const [data, setData] =
    useState(null)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings =
    async () => {
      try {
        const response =
          await api.get(
            "/admin/bookings"
          )

        setData(response.data)
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
        All Bookings
      </h1>

      <h2 className="text-2xl mb-4">
        Flights
      </h2>

      {data.flights.map(
        (booking) => (
          <div
            key={booking._id}
            className="shadow p-4 rounded mb-4"
          >
            <p>
              User:
              {" "}
              {
                booking.user
                  ?.name
              }
            </p>

            <p>
              Email:
              {" "}
              {
                booking.user
                  ?.email
              }
            </p>

            <p>
              Amount:
              {" "}
              ₹
              {
                booking.totalAmount
              }
            </p>

            <p>
              Status:
              {" "}
              {
                booking.status
              }
            </p>
          </div>
        )
      )}

      <h2 className="text-2xl mb-4 mt-8">
        Trains
      </h2>

      {data.trains.map(
        (booking) => (
          <div
            key={booking._id}
            className="shadow p-4 rounded mb-4"
          >
            <p>
              User:
              {" "}
              {
                booking.user
                  ?.name
              }
            </p>

            <p>
              Amount:
              {" "}
              ₹
              {
                booking.totalAmount
              }
            </p>

            <p>
              Status:
              {" "}
              {
                booking.status
              }
            </p>
          </div>
        )
      )}

      <h2 className="text-2xl mb-4 mt-8">
        Movies
      </h2>

      {data.movies.map(
        (booking) => (
          <div
            key={booking._id}
            className="shadow p-4 rounded mb-4"
          >
            <p>
              User:
              {" "}
              {
                booking.user
                  ?.name
              }
            </p>

            <p>
              Amount:
              {" "}
              ₹
              {
                booking.totalAmount
              }
            </p>

            <p>
              Status:
              {" "}
              {
                booking.status
              }
            </p>
          </div>
        )
      )}
    </MainLayout>
  )
}

export default AdminBookings