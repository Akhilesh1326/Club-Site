"use client"

import { useState, createContext } from "react"
import Sidebar from "../../components/Sidebar"
import Activity from "../../components/DashboardSections/Activity"
import Profile from "../../components/DashboardSections/Profile"
import Settings from "../../components/DashboardSections/Settings"
import Analytics from "../../components/DashboardSections/Analytics"
import Header from "../../components/DashboardHeader"
import ClubDashboard from "../dashboard/ClubDashboard"
import { useNavigate } from "react-router-dom"

// Create context for user data
export const UserContext = createContext()

export default function Dashboard() {
  const navgiate = useNavigate();
  const [activeSection, setActiveSection] = useState("activity")
  const [userRole, setUserRole] = useState("Fresher") // Default role

  const changeRole = (newRole) => {
    setUserRole(newRole)
  }

  // Define which sections each role can access
  const roleAccess = {
    Fresher: ["activity", "profile", "settings"],
    Club_Member: ["activity", "profile", "settings"],
    Club_President: ["activity", "profile", "settings", "analytics", "club dashboard"],
    General_Participant: ["activity", "profile", "settings"],
    Event_Organizer: ["activity", "profile", "settings", "analytics", "club dashboard"],
  }

  // Render the active section
  const renderSection = () => {
    switch (activeSection) {
      case "activity":
        return <Activity />
      case "profile":
        return <Profile />
      case "settings":
        return <Settings />
      case "analytics":
        return <Analytics />
      case "club dashboard":
        return navgiate("/club-dashboard")
      default:
        return <Activity />
    }
  }

  return (
    <UserContext.Provider value={{ userRole, changeRole }}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          accessibleSections={roleAccess[userRole]}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header userRole={userRole} />
          <main className="flex-1 overflow-y-auto p-4">{renderSection()}</main>
        </div>
      </div>
    </UserContext.Provider>
  )
}