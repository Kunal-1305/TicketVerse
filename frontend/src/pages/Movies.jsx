import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"
import { Link } from "react-router-dom"

function Movies() {
  const [movies, setMovies] =
    useState([])

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    try {
      const { data } =
        await api.get("/movies")

      setMovies(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Movies
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="shadow-md rounded overflow-hidden"
          >
            <img
              src={movie.poster}
              alt={movie.movieName}
              className="h-60 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-xl">
                {movie.movieName}
              </h2>

              <p>
                {movie.genre}
              </p>

              <p>
                {movie.language}
              </p>

              <p>
                Rating:
                {" "}
                {movie.rating}
              </p>

              <p>
                Duration:
                {" "}
                {movie.duration}
              </p>

              <Link
  to={`/movies/${movie._id}`}
>
  <button
    className="bg-black text-white px-4 py-2 mt-4 rounded"
  >
    Book Now
  </button>
</Link>

            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default Movies