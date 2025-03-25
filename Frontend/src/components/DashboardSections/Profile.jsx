"use client"

import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../features/dashboard/Dashboard"
import axios from "axios"

export default function Profile() {
    const { userRole, setUserRole } = useContext(UserContext)

    useEffect(() => {
        setUserData({
            name: "No information found",
            email: "No information found",
            phone: "No information found",
            department: "No information found",
            year: "No information found",
            role: "No information found",
            bio: "No information found",
            skills: [],
        })
        
        async function getUserData() {
            try {
                const response = await axios.get("/api/get-user")
                console.log(response.data)

                if (response.data) {
                    setUserData(response.data)
                    setUserRole(response.data.role);
                }
                console.log("name ", userData.name);
            } catch (error) {
                console.log("Error while getting profile data = ", error)
            }
        }

        getUserData()
    }, [])

    const [userData, setUserData] = useState({});

    // Form state
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserData(formData)
        setIsEditing(false)
    }

    const roleBadgeColors = {
        Fresher: "bg-green-100 text-green-800",
        Club_Member: "bg-blue-100 text-blue-800",
        Club_President: "bg-purple-100 text-purple-800",
        General_Participant: "bg-yellow-100 text-yellow-800",
        Event_Organizer: "bg-red-100 text-red-800",
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-700">Profile</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md hover:from-blue-600 hover:to-teal-600"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Name", name: "name", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone", name: "phone", type: "text" },
                            { label: "Department", name: "department", type: "text" },
                            { label: "Year", name: "year", type: "text" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData?.[field.name] || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <input
                                type="text"
                                name="role"
                                value={formData?.role || ""}
                                disabled
                                className="w-full p-2 border rounded-md bg-gray-100"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={formData?.bio || ""}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-2xl">
                            {userData.name?.charAt(0) || "U"}
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-blue-700">{userData.name}</h3>
                            <span
                                className={`px-3 py-1 text-sm rounded-full ${
                                    roleBadgeColors[userData.role] || "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {userData.role}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium text-teal-700">Contact Information</h4>
                            <p className="text-sm text-gray-600">Email: {userData.email}</p>
                            <p className="text-sm text-gray-600">Phone: {userData.phone}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-teal-700">Academic Information</h4>
                            <p className="text-sm text-gray-600">Department: {userData.department}</p>
                            <p className="text-sm text-gray-600">Year: {userData.year}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-teal-700">Bio</h4>
                        <p className="text-sm text-gray-600">{userData.bio}</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-teal-700">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {userData.skills?.length > 0 ? (
                                userData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No skills added</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
