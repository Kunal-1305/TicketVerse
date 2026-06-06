import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function Flights() {
  const [flights, setFlights] = useState([])
  const [filteredFlights, setFilteredFlights] = useState([])

  const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")

  useEffect(() => {
    getFlights()
  }, [])

  const getFlights = async () => {
    try {
      const { data } = await api.get("/flights")
      setFlights(data)
      setFilteredFlights(data)
    } catch (error) {
      console.log(error)
    }
  }

  const searchFlights = () => {
    const result = flights.filter(
      (flight) =>
        flight.source
          .toLowerCase()
          .includes(source.toLowerCase()) &&
        flight.destination
          .toLowerCase()
          .includes(destination.toLowerCase())
    )

    setFilteredFlights(result)
  }

  const bookFlight = async (id, passengers) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      await api.post(
        "/flights/book",
        {
          flightId: id,
          passengers
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      alert("Flight Booked")

      getFlights()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Flights
      </h1>

      <div className="bg-white shadow-md p-4 rounded mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Source"
            className="border p-2 rounded"
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Destination"
            className="border p-2 rounded"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          />

          <button
            onClick={searchFlights}
            className="bg-black text-white rounded"
          >
            Search Flights
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFlights.map((flight) => (
          <FlightCard
            key={flight._id}
            flight={flight}
            bookFlight={bookFlight}
          />
        ))}
      </div>
    </MainLayout>
  )
}

function FlightCard({ flight, bookFlight }) {
  const [passengers, setPassengers] =
    useState(1)

  return (
    <div className="shadow-md p-4 rounded">
      <h2 className="font-bold text-xl">
        {flight.airline}
      </h2>

      <p>
        {flight.source} → {flight.destination}
      </p>

      <p>
        Departure: {flight.departureTime}
      </p>

      <p>
        Arrival: {flight.arrivalTime}
      </p>

      <p>₹{flight.price}</p>

      <p>
        Available Seats:
        {" "}
        {flight.seatsAvailable}
      </p>

      <div className="flex items-center gap-3 mt-3">
        <label>Passengers</label>

        <select
          value={passengers}
          onChange={(e) =>
            setPassengers(
              Number(e.target.value)
            )
          }
          className="border p-2 rounded"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <button
        onClick={() =>
          bookFlight(
            flight._id,
            passengers
          )
        }
        className="bg-black text-white px-4 py-2 mt-4 rounded"
      >
        Book Flight
      </button>
    </div>
  )
}

export default Flights