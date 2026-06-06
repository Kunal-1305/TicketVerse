import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import api from "../services/api"

function AdminUsers() {
  const [users, setUsers] =
    useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const response =
        await api.get(
          "/admin/users"
        )

      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const blockUser = async (
    id
  ) => {
    await api.put(
      `/admin/users/block/${id}`
    )

    loadUsers()
  }

  const unblockUser = async (
    id
  ) => {
    await api.put(
      `/admin/users/unblock/${id}`
    )

    loadUsers()
  }

  const deleteUser = async (
    id
  ) => {
    await api.delete(
      `/admin/users/${id}`
    )

    loadUsers()
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="shadow p-4 rounded"
          >
            <h2>
              {user.name}
            </h2>

            <p>
              {user.email}
            </p>

            <p>
              Role:
              {" "}
              {user.role}
            </p>

            <p>
              Status:
              {" "}
              {user.isBlocked
                ? "Blocked"
                : "Active"}
            </p>

            <div className="flex gap-2 mt-3">

              {user.isBlocked ? (
                <button
                  onClick={() =>
                    unblockUser(
                      user._id
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Unblock
                </button>
              ) : (
                <button
                  onClick={() =>
                    blockUser(
                      user._id
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Block
                </button>
              )}

              <button
                onClick={() =>
                  deleteUser(
                    user._id
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default AdminUsers