import axios from "axios"

const api = axios.create({
  baseURL:
    "https://ticketverse-backend-y5f0.onrender.com/api"
})

export default api