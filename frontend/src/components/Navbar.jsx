import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="flex justify-between p-4 shadow">
      <h1 className="font-bold">
        {user?.role === "admin"
          ? "TicketVerse Admin"
          : "TicketVerse"}
      </h1>

      <button
        onClick={logout}
        className="bg-black text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar