"use client"
import { useContext } from "react"
import { UserContext } from "../../features/dashboard/Dashboard"

export default function Activity() {
  const { userRole } = useContext(UserContext)

  // Different activities based on user role
  const activities = {
    Fresher: [
      { id: 1, title: "Welcome Orientation", date: "2023-09-01", status: "Completed" },
      { id: 2, title: "Campus Tour", date: "2023-09-02", status: "Completed" },
      { id: 3, title: "Club Fair", date: "2023-09-05", status: "Upcoming" },
    ],
    Club_Member: [
      { id: 1, title: "Weekly Meeting", date: "2023-09-10", status: "Upcoming" },
      { id: 2, title: "Workshop", date: "2023-09-15", status: "Upcoming" },
      { id: 3, title: "Social Event", date: "2023-09-20", status: "Upcoming" },
    ],
    Club_President: [
      { id: 1, title: "Budget Meeting", date: "2023-09-08", status: "Upcoming" },
      { id: 2, title: "Leadership Workshop", date: "2023-09-12", status: "Upcoming" },
      { id: 3, title: "Club Strategy Planning", date: "2023-09-18", status: "Upcoming" },
    ],
    General_Participant: [
      { id: 1, title: "Campus Event", date: "2023-09-11", status: "Upcoming" },
      { id: 2, title: "Guest Lecture", date: "2023-09-16", status: "Upcoming" },
      { id: 3, title: "Community Service", date: "2023-09-22", status: "Upcoming" },
    ],
    Event_Organizer: [
      { id: 1, title: "Event Planning Meeting", date: "2023-09-07", status: "Upcoming" },
      { id: 2, title: "Venue Booking", date: "2023-09-14", status: "Pending" },
      { id: 3, title: "Marketing Campaign", date: "2023-09-19", status: "Not Started" },
    ],
  }

  const userActivities = activities[userRole] || []

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 min-h-screen p-4">
      <header className="sticky top-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white z-10 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Activity Dashboard</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-teal-100">
                <th className="text-left py-2 px-3 text-gray-700">Activity</th>
                <th className="text-left py-2 px-3 text-gray-700">Date</th>
                <th className="text-left py-2 px-3 text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {userActivities.map((activity) => (
                <tr key={activity.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700">{activity.title}</td>
                  <td className="py-2 px-3 text-gray-700">{activity.date}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : activity.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : activity.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">This Week</h3>
          <ul className="space-y-2">
            {userActivities.slice(0, 2).map((activity) => (
              <li key={`task-${activity.id}`} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-700">{activity.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Upcoming</h3>
          <ul className="space-y-2">
            {userActivities.slice(-1).map((activity) => (
              <li key={`upcoming-${activity.id}`} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                <span className="text-gray-700">{activity.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
