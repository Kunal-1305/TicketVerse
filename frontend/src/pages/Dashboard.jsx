import { Link } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">
        Welcome to TicketVerse
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link to="/flights">
          <div className="shadow-lg rounded-xl p-6 hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">
              ✈ Flights
            </h2>

            <p>
              Search and book flights across India.
            </p>
          </div>
        </Link>

        <Link to="/trains">
          <div className="shadow-lg rounded-xl p-6 hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">
              🚆 Trains
            </h2>

            <p>
              Book train tickets instantly.
            </p>
          </div>
        </Link>

        <Link to="/movies">
          <div className="shadow-lg rounded-xl p-6 hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">
              🎬 Movies
            </h2>

            <p>
              Select seats and book movie tickets.
            </p>
          </div>
        </Link>

      </div>
    </MainLayout>
  )
}

export default Dashboard