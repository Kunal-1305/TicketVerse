import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      })

      navigate("/")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white w-full p-2"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register