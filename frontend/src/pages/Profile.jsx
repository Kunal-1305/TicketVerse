import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function Profile() {
  const [profile, setProfile] =
    useState(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      const response =
        await api.get(
          "/profile",
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`
            }
          }
        )

      setProfile(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!profile) {
    return (
      <MainLayout>
        Loading...
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="shadow-md p-6 rounded">
        <p>
          <strong>Name:</strong>
          {" "}
          {profile.name}
        </p>

        <p className="mt-2">
          <strong>Email:</strong>
          {" "}
          {profile.email}
        </p>

        <p className="mt-2">
          <strong>Role:</strong>
          {" "}
          {profile.role}
        </p>

        <hr className="my-4" />

        <p>
          <strong>
            Flight Bookings:
          </strong>
          {" "}
          {
            profile.flightBookings
          }
        </p>

        <p>
          <strong>
            Train Bookings:
          </strong>
          {" "}
          {
            profile.trainBookings
          }
        </p>

        <p>
          <strong>
            Movie Bookings:
          </strong>
          {" "}
          {
            profile.movieBookings
          }
        </p>

        <p className="mt-3">
          <strong>
            Total Spent:
          </strong>
          {" "}
          ₹
          {
            profile.totalSpent
          }
        </p>

        <p className="mt-3">
          <strong>
            Member Since:
          </strong>
          {" "}
          {new Date(
            profile.createdAt
          ).toLocaleDateString()}
        </p>
      </div>
    </MainLayout>
  )
}

export default Profile