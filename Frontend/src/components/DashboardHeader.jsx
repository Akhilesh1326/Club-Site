"use client"

export default function Header({ userRole, changeRole }) {
  const roles = ["Fresher", "Club_Member", "Club_President", "General_Participant", "Event_Organizer"]

  return (
    <header className="sticky top-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md px-6 py-3 flex justify-between items-center z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-white">Role:</span>
          <select
            value={userRole}
            onChange={(e) => changeRole(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm text-gray-700"
          >
            {roles.map((role) => (
              <option key={role} value={role} className="text-gray-700">
                {role.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              userRole === "Fresher" ? "bg-green-500" :
              userRole === "Club_Member" ? "bg-purple-500" :
              userRole === "Club_President" ? "bg-red-500" :
              userRole === "General_Participant" ? "bg-yellow-500" :
              "bg-blue-500"
            }`}
          >
            {userRole[0]}
          </div>
          <span className="text-sm font-medium">User</span>
        </div>
      </div>
    </header>
  )
}
