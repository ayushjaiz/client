import { useEffect, useState } from "react"
import { User } from "@/types/user"
import { fetchUsers, updateUser } from "./lib/api"
import UserRow from "./UserRow"


export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  const handleUserUpdate = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser)
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    } catch (err) {
      console.log(err);
      setError("Failed to update user");
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Id</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-center">Edit</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <UserRow key={user.id} user={user} onUpdate={handleUserUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

