import {
  useEffect,
  useState
} from "react"

import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function AdminDashboard() {
  const [data, setData] =
    useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response =
        await api.get(
          "/admin/analytics"
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
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="shadow p-4 rounded">
          <h2>Total Users</h2>
          <p className="text-2xl">
            {data.totalUsers}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Active Users</h2>
          <p className="text-2xl">
            {data.activeUsers}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Blocked Users</h2>
          <p className="text-2xl">
            {data.blockedUsers}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Total Revenue</h2>
          <p className="text-2xl">
            ₹
            {data.totalRevenue}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Flights Revenue</h2>
          <p className="text-xl">
            ₹
            {data.flightRevenue}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Trains Revenue</h2>
          <p className="text-xl">
            ₹
            {data.trainRevenue}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Movies Revenue</h2>
          <p className="text-xl">
            ₹
            {data.movieRevenue}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Total Flights</h2>
          <p className="text-xl">
            {data.totalFlights}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Total Trains</h2>
          <p className="text-xl">
            {data.totalTrains}
          </p>
        </div>

        <div className="shadow p-4 rounded">
          <h2>Total Movies</h2>
          <p className="text-xl">
            {data.totalMovies}
          </p>
        </div>

      </div>
    </MainLayout>
  )
}

export default AdminDashboard