import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function Trains() {
  const [trains, setTrains] = useState([])
  const [filteredTrains, setFilteredTrains] =
    useState([])

  const [source, setSource] =
    useState("")

  const [destination, setDestination] =
    useState("")

  useEffect(() => {
    getTrains()
  }, [])

  const getTrains = async () => {
    try {
      const { data } =
        await api.get("/trains")

      setTrains(data)
      setFilteredTrains(data)
    } catch (error) {
      console.log(error)
    }
  }

  const searchTrains = () => {
    const result = trains.filter(
      (train) =>
        train.source
          .toLowerCase()
          .includes(source.toLowerCase()) &&
        train.destination
          .toLowerCase()
          .includes(destination.toLowerCase())
    )

    setFilteredTrains(result)
  }

  const bookTrain = async (
    id,
    passengers
  ) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      )

      await api.post(
        "/trains/book",
        {
          trainId: id,
          passengers
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      )

      alert("Train Booked")

      getTrains()
    } catch (error) {
      alert(
        error.response.data.message
      )
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Trains
      </h1>

      <div className="shadow-md p-4 rounded mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) =>
              setSource(
                e.target.value
              )
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) =>
              setDestination(
                e.target.value
              )
            }
            className="border p-2 rounded"
          />

          <button
            onClick={searchTrains}
            className="bg-black text-white rounded"
          >
            Search Trains
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTrains.map(
          (train) => (
            <TrainCard
              key={train._id}
              train={train}
              bookTrain={
                bookTrain
              }
            />
          )
        )}
      </div>
    </MainLayout>
  )
}

function TrainCard({
  train,
  bookTrain
}) {
  const [passengers, setPassengers] =
    useState(1)

  return (
    <div className="shadow-md p-4 rounded">
      <h2 className="font-bold text-xl">
        {train.trainName}
      </h2>

      <p>
        {train.source}
        {" → "}
        {train.destination}
      </p>

      <p>
        Departure:
        {" "}
        {train.departureTime}
      </p>

      <p>
        Arrival:
        {" "}
        {train.arrivalTime}
      </p>

      <p>₹{train.price}</p>

      <p>
        Seats:
        {" "}
        {train.seatsAvailable}
      </p>

      <div className="mt-3">
        <select
          value={passengers}
          onChange={(e) =>
            setPassengers(
              Number(
                e.target.value
              )
            )
          }
          className="border p-2"
        >
          <option value={1}>
            1
          </option>
          <option value={2}>
            2
          </option>
          <option value={3}>
            3
          </option>
          <option value={4}>
            4
          </option>
          <option value={5}>
            5
          </option>
        </select>
      </div>

      <button
        onClick={() =>
          bookTrain(
            train._id,
            passengers
          )
        }
        className="bg-black text-white px-4 py-2 mt-3 rounded"
      >
        Book Train
      </button>
    </div>
  )
}

export default Trains