import { Link } from "react-router-dom"

function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const isAdmin =
    user?.role === "admin"

  return (
    <div className="w-64 min-h-screen shadow-md p-4">
      <div className="space-y-4">

        {isAdmin ? (
          <>
  <Link
    to="/admin"
    className="block"
  >
    Dashboard
  </Link>

  <Link
  to="/admin/bookings"
  className="block"
>
  All Bookings
</Link>

  <Link
    to="/admin/users"
    className="block"
  >
    User Management
  </Link>

  <Link
    to="/profile"
    className="block"
  >
    Admin Profile
  </Link>
</>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="block"
            >
              Dashboard
            </Link>

            <Link
              to="/flights"
              className="block"
            >
              Flights
            </Link>

            <Link
              to="/trains"
              className="block"
            >
              Trains
            </Link>

            <Link
              to="/movies"
              className="block"
            >
              Movies
            </Link>

            <Link
              to="/bookings"
              className="block"
            >
              Bookings
            </Link>

            <Link
              to="/profile"
              className="block"
            >
              Profile
            </Link>
          </>
        )}

      </div>
    </div>
  )
}

export default Sidebar