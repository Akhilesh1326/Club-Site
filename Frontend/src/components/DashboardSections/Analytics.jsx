"use client"

import { useContext } from "react"
import { UserContext } from "../../features/dashboard/Dashboard"

export default function Analytics() {
  const { userRole } = useContext(UserContext)

  // Only Club_President and Event_Organizer should see this page
  if (userRole !== "Club_President" && userRole !== "Event_Organizer") {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
        <p className="text-red-500">You don't have permission to view this page.</p>
      </div>
    )
  }

  // Mock data for analytics
  const eventData = [
    { name: "Tech Workshop", attendees: 45, satisfaction: 4.7 },
    { name: "Networking Mixer", attendees: 78, satisfaction: 4.2 },
    { name: "Hackathon", attendees: 120, satisfaction: 4.8 },
    { name: "Guest Speaker", attendees: 65, satisfaction: 4.5 },
    { name: "Career Fair", attendees: 200, satisfaction: 4.3 },
  ]

  const membershipData = {
    total: 250,
    active: 180,
    new: 35,
    growth: "+16%",
  }

  const engagementData = {
    eventsHosted: 12,
    avgAttendance: 85,
    totalParticipants: 1020,
    satisfactionScore: 4.5,
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-1">Total Members</h3>
          <p className="text-2xl font-bold">{membershipData.total}</p>
          <p className="text-sm text-blue-600">{membershipData.active} active</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-1">New Members</h3>
          <p className="text-2xl font-bold">{membershipData.new}</p>
          <p className="text-sm text-green-600">{membershipData.growth} this month</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 mb-1">Events Hosted</h3>
          <p className="text-2xl font-bold">{engagementData.eventsHosted}</p>
          <p className="text-sm text-purple-600">This semester</p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-amber-700 mb-1">Satisfaction</h3>
          <p className="text-2xl font-bold">{engagementData.satisfactionScore}/5</p>
          <p className="text-sm text-amber-600">Average rating</p>
        </div>
      </div>

      {/* Event Performance */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Event Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Event Name</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Attendees</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Satisfaction</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {eventData.map((event, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-sm">{event.name}</td>
                  <td className="py-3 px-4 text-sm">{event.attendees}</td>
                  <td className="py-3 px-4 text-sm">{event.satisfaction}/5</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(event.satisfaction / 5) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Attendance Overview</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Average Attendance</span>
                  <span className="text-sm font-medium">{engagementData.avgAttendance} people</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${(engagementData.avgAttendance / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Total Participants</span>
                  <span className="text-sm font-medium">{engagementData.totalParticipants}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Member Distribution</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Active Members</span>
                  <span className="text-sm font-medium">
                    {membershipData.active}/{membershipData.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${(membershipData.active / membershipData.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">New Members</span>
                  <span className="text-sm font-medium">
                    {membershipData.new}/{membershipData.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-600 h-2.5 rounded-full"
                    style={{ width: `${(membershipData.new / membershipData.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

