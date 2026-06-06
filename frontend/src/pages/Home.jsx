import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-5xl font-bold mb-4">
        TicketVerse
      </h1>

      <p className="mb-10">
        Flight • Train • Movie Booking Platform
      </p>

      <div className="flex gap-4">

        <Link to="/login">
          <button className="bg-black text-white px-6 py-3 rounded">
            User Login
          </button>
        </Link>

        <Link to="/register">
          <button className="bg-green-600 text-white px-6 py-3 rounded">
            Register
          </button>
        </Link>

        <Link to="/admin-login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Admin Login
          </button>
        </Link>

      </div>
    </div>
  )
}

export default Home