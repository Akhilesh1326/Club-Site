"use client"

import { useState, createContext } from "react"
import Sidebar from "../../components/Sidebar"
import Activity from "../../components/DashboardSections/Activity"
import Profile from "../../components/DashboardSections/Profile"
import Settings from "../../components/DashboardSections/Settings"
import Analytics from "../../components/DashboardSections/Analytics"
import Header from "../../components/DashboardHeader"

// Create context for user data
export const UserContext = createContext()

export default function Dashboard() {
  // State for active section and user role
  const [activeSection, setActiveSection] = useState("activity")
  const [userRole, setUserRole] = useState("Club_Member") // Default role

  // Define which sections each role can access
  const roleAccess = {
    Fresher: ["activity", "profile", "settings"],
    Club_Member: ["activity", "profile", "settings"],
    Club_President: ["activity", "profile", "settings", "analytics"],
    General_Participant: ["activity", "profile", "settings"],
    Event_Organizer: ["activity", "profile", "settings", "analytics"],
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
      default:
        return <Activity />
    }
  }

  // Change role function (for demo purposes)
  const changeRole = (newRole) => {
    setUserRole(newRole)
    // If user doesn't have access to current section, switch to activity
    if (!roleAccess[newRole].includes(activeSection)) {
      setActiveSection("activity")
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
          <Header userRole={userRole} changeRole={changeRole} />
          <main className="flex-1 overflow-y-auto p-4">{renderSection()}</main>
        </div>
      </div>
    </UserContext.Provider>
  )
}

