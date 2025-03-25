"use client"

import { useState } from "react"
import { Award, Calendar, Edit, FileText, Key, Mail, MapPin, Phone, Shield, Star, User, Users } from "lucide-react"

// Admin profile data
const adminProfile = {
  id: "admin-123",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Club founder and technology enthusiast with 10+ years of experience in software development.",
  role: "Admin",
  joinDate: "Jan 15, 2022",
  avatar: "/placeholder.svg?height=200&width=200",
  skills: ["Leadership", "Event Planning", "Public Speaking", "Programming"],
  interests: ["AI", "Web Development", "Blockchain", "IoT"],
  eventsAttended: 24,
  eventsOrganized: 15,
  contributions: 47,
  recentActivities: [
    { type: "Event", description: "Created Tech Talk: AI in 2023", date: "2 days ago" },
    { type: "Member", description: "Approved 5 new member applications", date: "1 week ago" },
    { type: "Post", description: "Published Summer Hackathon announcement", date: "2 weeks ago" },
  ],
  permissions: ["Manage Members", "Create Events", "Edit Club Settings", "Manage Roles", "Financial Access"],
}

export default function AdminProfile() {
  const [tabValue, setTabValue] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const profile = adminProfile

  return (
    <div className="bg-gray-50 text-gray-800 scroll-smooth">
      <MouseEffect />
      <Header />

      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Admin Profile</h1>
          <p className="text-xl max-w-3xl mx-auto">Complete access to manage the club and its members</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-36 bg-purple-50 relative flex items-end px-6 pb-16">
              <div className="absolute bottom-0 translate-y-1/2 left-6 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-28 flex items-center gap-2">
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-sm font-semibold">
                  {profile.role}
                </span>
              </div>

              <button
                className="absolute right-6 bottom-0 translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
                onClick={() => setEditMode(!editMode)}
              >
                <Edit className="h-4 w-4" />
                {editMode ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex px-6">
              <button
                className={`py-4 px-4 font-medium text-sm ${tabValue === 0 ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setTabValue(0)}
              >
                Overview
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm ${tabValue === 1 ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setTabValue(1)}
              >
                Activities
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm ${tabValue === 2 ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setTabValue(2)}
              >
                Settings
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm ${tabValue === 3 ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setTabValue(3)}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {tabValue === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Personal Info */}
                <div className="md:col-span-1 space-y-6">
                  {/* Personal Information */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      {editMode ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                              type="text"
                              defaultValue={profile.name}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              type="email"
                              defaultValue={profile.email}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                              type="tel"
                              defaultValue={profile.phone}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                              type="text"
                              defaultValue={profile.location}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                              defaultValue={profile.bio}
                              rows={4}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{profile.email}</p>
                              <p className="text-xs text-gray-500">Email</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
                              <p className="text-xs text-gray-500">Phone</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{profile.location}</p>
                              <p className="text-xs text-gray-500">Location</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{profile.joinDate}</p>
                              <p className="text-xs text-gray-500">Member Since</p>
                            </div>
                          </div>

                          <hr className="my-4" />

                          <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Bio</p>
                              <p className="text-sm text-gray-900">{profile.bio}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills & Interests */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Skills & Interests</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      {editMode ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Skills</label>
                            <input
                              type="text"
                              defaultValue={profile.skills.join(", ")}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Interests</label>
                            <input
                              type="text"
                              defaultValue={profile.interests.join(", ")}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.interests.map((interest, index) => (
                                <span
                                  key={index}
                                  className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full border border-gray-300"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats & Activities */}
                <div className="md:col-span-2 space-y-6">
                  {/* Club Statistics */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Club Statistics</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <p className="text-2xl font-bold text-gray-900">{profile.eventsAttended}</p>
                          <p className="text-sm text-gray-500">Events Attended</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Star className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <p className="text-2xl font-bold text-gray-900">{profile.eventsOrganized}</p>
                          <p className="text-sm text-gray-500">Events Organized</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <Award className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <p className="text-2xl font-bold text-gray-900">{profile.contributions}</p>
                          <p className="text-sm text-gray-500">Contributions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="space-y-4">
                        {profile.recentActivities.map((activity, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-3 ${
                              index < profile.recentActivities.length - 1 ? "pb-4 border-b border-gray-200" : ""
                            }`}
                          >
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                activity.type === "Event"
                                  ? "bg-blue-100 text-blue-800"
                                  : activity.type === "Member"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {activity.type}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Admin Permissions */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Admin Permissions</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="space-y-2">
                        {profile.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-900">{permission}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {tabValue === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event History */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Event History</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4 divide-y divide-gray-200">
                      <div className="pb-4">
                        <p className="font-medium text-gray-900">React Workshop</p>
                        <p className="text-sm text-gray-500">Attended • May 15, 2023</p>
                      </div>
                      <div className="py-4">
                        <p className="font-medium text-gray-900">Summer Hackathon</p>
                        <p className="text-sm text-gray-500">Attended • July 1-3, 2023</p>
                      </div>
                      <div className="py-4">
                        <p className="font-medium text-gray-900">Tech Talk: AI in 2023</p>
                        <p className="text-sm text-gray-500">Organized • June 15, 2023</p>
                      </div>
                      <div className="pt-4">
                        <p className="font-medium text-gray-900">Workshop: Intro to React</p>
                        <p className="text-sm text-gray-500">Attended • July 10, 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contributions */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Contributions</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4 divide-y divide-gray-200">
                      <div className="pb-4 flex items-start gap-3">
                        <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Approved 5 new member applications</p>
                          <p className="text-xs text-gray-500">1 week ago</p>
                        </div>
                      </div>
                      <div className="py-4 flex items-start gap-3">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Published Summer Hackathon announcement</p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="py-4 flex items-start gap-3">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Shared article on JavaScript best practices
                          </p>
                          <p className="text-xs text-gray-500">1 month ago</p>
                        </div>
                      </div>
                      <div className="pt-4 flex items-start gap-3">
                        <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Participated in Code Review session</p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {tabValue === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Settings */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          defaultValue={profile.email}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                          type="password"
                          defaultValue="********"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          defaultValue={profile.phone}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Update Account
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Notification Preferences */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="space-y-4 divide-y divide-gray-200">
                        <div className="pb-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">
                              Receive emails about events, announcements, and mentions
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Enabled</span>
                        </div>

                        <div className="py-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Enabled</span>
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                          </div>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Disabled</span>
                        </div>
                      </div>

                      <button className="mt-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Manage Notifications
                      </button>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="space-y-4 divide-y divide-gray-200">
                        <div className="pb-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Profile Visibility</p>
                            <p className="text-sm text-gray-500">Who can see your profile information</p>
                          </div>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Club Members</span>
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Contact Information</p>
                            <p className="text-sm text-gray-500">Who can see your contact information</p>
                          </div>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Admins Only</span>
                        </div>
                      </div>

                      <button className="mt-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Update Privacy Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Tab */}
            {tabValue === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Club Management */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Club Management</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                        <Users className="h-4 w-4" />
                        <span>Manage Member Roles</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                        <Shield className="h-4 w-4" />
                        <span>Moderation Settings</span>
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                        <Key className="h-4 w-4" />
                        <span>Permission Management</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Club Analytics */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Club Analytics</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                        <Users className="h-4 w-4" />
                        <span>Membership Growth</span>
                      </button>
                      <p className="text-xs text-gray-500 ml-6">View detailed membership statistics</p>

                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4" />
                        <span>Event Analytics</span>
                      </button>
                      <p className="text-xs text-gray-500 ml-6">Track event attendance and engagement</p>

                      <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                        <FileText className="h-4 w-4" />
                        <span>Content Performance</span>
                      </button>
                      <p className="text-xs text-gray-500 ml-6">Analyze engagement with club content</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mouse effect component
function MouseEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* This would contain the mouse effect implementation */}
    </div>
  )
}

// Header component
function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Tech Club</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Events
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Members
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>
      </div>
    </header>
  )
}

