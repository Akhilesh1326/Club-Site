"use client"
import { UserContext } from "../features/dashboard/Dashboard"
import { useState, useContext } from "react"

export default function Header() {
  const { userRole } = useContext(UserContext)
  
  // Format the role for display, handle undefined case
  const displayRole = userRole ? userRole.replace("_", " ") : "Loading..."
  
  // Get the first letter for the avatar, handle undefined case
  const roleInitial = userRole ? userRole[0] : "U"
  
  return (
    <header className="sticky top-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md px-6 py-3 flex justify-between items-center z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-white">
          <span className="mr-2">Role:</span>
          <span className="font-medium">{displayRole}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              userRole === "Fresher" ? "bg-green-500" :
              userRole === "Club_Member" ? "bg-purple-500" :
              userRole === "Club_President" ? "bg-red-500" :
              userRole === "General_Participant" ? "bg-yellow-500" :
              userRole === "Event_Organizer" ? "bg-orange-500" :
              "bg-blue-500"
            }`}
          >
            {roleInitial}
          </div>
          <span className="text-sm font-medium">User</span>
        </div>
      </div>
    </header>
  )
}