"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsSection() {
  const [settings, setSettings] = useState({
    clubName: "Tech Enthusiasts",
    description: "A club for technology lovers",
    email: "tech@example.com",
    isPublic: true,
    allowMemberPosts: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleToggle = (name: string) => {
    setSettings({ ...settings, [name]: !settings[name as keyof typeof settings] })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="clubName" className="block text-sm font-medium text-gray-700">
              Club Name
            </label>
            <Input id="clubName" name="clubName" value={settings.clubName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea id="description" name="description" value={settings.description} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <Input id="email" name="email" type="email" value={settings.email} onChange={handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Public Club</span>
            <Switch checked={settings.isPublic} onCheckedChange={() => handleToggle("isPublic")} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Allow Member Posts</span>
            <Switch checked={settings.allowMemberPosts} onCheckedChange={() => handleToggle("allowMemberPosts")} />
          </div>
          <Button type="button" onClick={() => console.log("Settings saved:", settings)}>
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

