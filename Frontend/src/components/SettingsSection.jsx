import { useState } from "react"

const SettingsSection = () => {
  const [settings, setSettings] = useState({
    clubName: "Tech Enthusiasts",
    description: "A club for technology lovers",
    email: "tech@example.com",
    isPublic: true,
    allowMemberPosts: true,
  })

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleToggle = (name) => {
    setSettings({ ...settings, [name]: !settings[name] })
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Club Settings</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">
            Club Name
          </label>
          <input
            id="clubName"
            name="clubName"
            type="text"
            value={settings.clubName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={settings.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={settings.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Public Club</span>
          <button
            type="button"
            onClick={() => handleToggle("isPublic")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.isPublic ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.isPublic ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Allow Member Posts</span>
          <button
            type="button"
            onClick={() => handleToggle("allowMemberPosts")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.allowMemberPosts ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.allowMemberPosts ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <button
          type="button"
          onClick={() => console.log("Settings saved:", settings)}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}

export default SettingsSection
