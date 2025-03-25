"use client"

import { useState } from "react"

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: true,
      showPhone: false,
    },
    theme: "light",
    language: "english",
  })

  // Handle notifications and privacy changes
  const handleToggleChange = (section, name, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [name]: value,
      },
    })
  }

  // Handle other input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  // Reusable Toggle Component
  const ToggleSwitch = ({ label, name, section, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={settings[section][name]}
          onChange={(e) => handleToggleChange(section, name, e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="space-y-8">
        {/* Notifications Section */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-3">
            <ToggleSwitch
              label="Email Notifications"
              name="email"
              section="notifications"
              description="Receive email updates about your account"
            />
            <ToggleSwitch
              label="Push Notifications"
              name="push"
              section="notifications"
              description="Receive push notifications on your device"
            />
            <ToggleSwitch
              label="SMS Notifications"
              name="sms"
              section="notifications"
              description="Receive text messages for important updates"
            />
          </div>
        </section>

        {/* Privacy Section */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Privacy</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Visibility</label>
              <select
                name="profileVisibility"
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleToggleChange("privacy", "profileVisibility", e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="public">Public</option>
                <option value="members">Members Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <ToggleSwitch
              label="Show Email Address"
              name="showEmail"
              section="privacy"
              description="Allow others to see your email address"
            />
            <ToggleSwitch
              label="Show Phone Number"
              name="showPhone"
              section="privacy"
              description="Allow others to see your phone number"
            />
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="pt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}
