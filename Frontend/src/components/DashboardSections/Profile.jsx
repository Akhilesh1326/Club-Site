"use client"

import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../features/dashboard/Dashboard"
import axios from "axios"

export default function Profile() {
    const { userRole, changeRole } = useContext(UserContext)

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function getUserData() {
            try {
                setLoading(true);
                const response = await axios.get("/api/auth-service/get-user")
                const user = response.data;
                setUserData(user.user);
                setFormData(user.user); // Initialize form with user data
                changeRole(user.user.role); // Update context
                console.log(user.user)

            } catch (error) {
                console.log("Error while getting profile data = ", error);
            } finally {
                setLoading(false);
            }
        }

        getUserData();
    }, [changeRole]);

    // Form state
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // You might want to add an API call here to update the user data on the server
            // const response = await axios.put("/api/auth-service/update-user", formData)
            
            setUserData(formData)
            setIsEditing(false)
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    }

    const roleBadgeColors = {
        Fresher: "bg-green-100 text-green-800",
        Club_Member: "bg-blue-100 text-blue-800",
        Club_President: "bg-purple-100 text-purple-800",
        General_Participant: "bg-yellow-100 text-yellow-800",
        Event_Organizer: "bg-red-100 text-red-800",
    }

    // Show loading state while fetching data
    if (loading) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg shadow-lg p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-blue-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-20 bg-blue-200 rounded"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-16 bg-blue-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
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
                            { label: "First Name", name: "firstName", type: "text" },
                            { label: "Last Name", name: "lastName", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Phone", name: "phoneNumber", type: "text" },
                            { label: "Department", name: "department", type: "text" },
                            { label: "Year", name: "year", type: "number" },
                            { label: "Username", name: "userName", type: "text" },
                            { label: "Date of Birth", name: "dob", type: "date" },
                            { label: "City", name: "city", type: "text" },
                            { label: "State", name: "state", type: "text" },
                            { label: "College/University", name: "collegeOrUniversityName", type: "text" },
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
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 overflow-hidden">
                            {userData.profilePictureUrl ? (
                                <img
                                    src={userData.profilePictureUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                                    {userData.firstName?.charAt(0) || "U"}
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-blue-700">
                                {`${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Unknown User"}
                            </h3>
                            <span
                                className={`px-3 py-1 text-sm rounded-full ${roleBadgeColors[userData.role] || "bg-gray-100 text-gray-800"}`}
                            >
                                {userData.role || "No Role"}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium text-teal-700">Contact Information</h4>
                            <p className="text-sm text-gray-600">Email: {userData.email || "Not provided"}</p>
                            <p className="text-sm text-gray-600">Phone: {userData.phoneNumber || "Not provided"}</p>
                            <p className="text-sm text-gray-600">Username: {userData.userName || "Not provided"}</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-teal-700">Academic Information</h4>
                            <p className="text-sm text-gray-600">College/University: {userData.collegeOrUniversityName || "Not provided"}</p>
                            <p className="text-sm text-gray-600">Department: {userData.department || "Not provided"}</p>
                            <p className="text-sm text-gray-600">Year: {userData.year || "Not provided"}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-teal-700">Personal Information</h4>
                        <p className="text-sm text-gray-600">Date of Birth: {userData.dob || "Not provided"}</p>
                        <p className="text-sm text-gray-600">City: {userData.city || "Not provided"}</p>
                        <p className="text-sm text-gray-600">State: {userData.state || "Not provided"}</p>
                        <p className="text-sm text-gray-600">
                            Member Since: {userData.joinedAt ? new Date(userData.joinedAt).toLocaleDateString() : "Not available"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}