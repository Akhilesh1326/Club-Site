"use client"
import { BarChart2, ActivityIcon, User, SettingsIcon } from "lucide-react"

export default function Sidebar({ activeSection, setActiveSection, accessibleSections }) {
  // Navigation items with their icons
  const navItems = [
    { id: "activity", name: "Activity", icon: ActivityIcon },
    { id: "profile", name: "Profile", icon: User },
    { id: "settings", name: "Settings", icon: SettingsIcon },
    { id: "analytics", name: "Analytics", icon: BarChart2 },
    { id: "club dashboard", name: "Club Dashboard", icon:BarChart2 },
  ]

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold ">Menu</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => {
            // Only show sections the user has access to
            if (!accessibleSections.includes(item.id)) return null

            return (
              <li key={item.id} className="px-2 py-1">
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-2 rounded-md ${
                    activeSection === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

