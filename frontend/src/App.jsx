import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Flights from "./pages/Flights"
import Trains from "./pages/Trains"
import Movies from "./pages/Movies"
import Bookings from "./pages/Bookings"
import Profile from "./pages/Profile"
import MovieSeats from "./pages/MovieSeats"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import AdminRoute from "./components/AdminRoute"
import AdminUsers from "./pages/AdminUsers"
import AdminBookings from "./pages/AdminBookings"


import AdminDashboard from "./pages/AdminDashboard"


import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/admin-login"
  element={<AdminLogin />}
/>

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/flights"
  element={
    <ProtectedRoute>
      <Flights />
    </ProtectedRoute>
  }
/>

<Route
  path="/trains"
  element={
    <ProtectedRoute>
      <Trains />
    </ProtectedRoute>
  }
/>

<Route
  path="/movies"
  element={
    <ProtectedRoute>
      <Movies />
    </ProtectedRoute>
  }
/>

<Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <Bookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>



<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/movies/:id"
  element={
    <ProtectedRoute>
      <MovieSeats />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <AdminBookings />
    </AdminRoute>
  }
/>


    </Routes>
  )
}

export default App