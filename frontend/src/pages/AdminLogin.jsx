import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function AdminLogin() {
  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        )

      if (
        data.role !== "admin"
      ) {
        return alert(
          "Not an admin account"
        )
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      )

      navigate("/admin")
    } catch (error) {
      alert(
        error.response.data.message
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button className="bg-blue-600 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin