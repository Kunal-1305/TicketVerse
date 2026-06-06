import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const { data } = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    )

    if (data.role === "admin") {
      return alert(
        "Please use Admin Login"
      )
    }

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    )

    setUser(data)

    navigate("/dashboard")
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login Failed"
    )
  }
}
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          User Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-4 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-4 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-black text-white w-full p-3 rounded"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p>
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-blue-600"
          >
            Register Here
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-600"
          >
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login