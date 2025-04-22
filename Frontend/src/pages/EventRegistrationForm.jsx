import { useState, useEffect, useRef } from "react"
import { format } from "date-fns"
import axios from 'axios'

export default function EventRegistrationForm() {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    location: "",
    clubId: "",
    eventType: "",
    registrationRequired: false,
    maxParticipants: "",
  })

  // Validation state
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendar, setShowCalendar] = useState(null)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showEventTypeDropdown, setShowEventTypeDropdown] = useState(false)
  const startDateCalendarRef = useRef(null);
  const endDateCalendarRef = useRef(null);
  const categoryRef = useRef(null)
  const eventTypeRef = useRef(null)

  // Categories for dropdown
  const categories = [
    { value: "Workshop", label: "Workshop" },
    { value: "Hackathon", label: "Hackathon" },
    { value: "Cultural", label: "Cultural" },
    { value: "Technical", label: "Technical" },
    { value: "Networking", label: "Networking" },
    { value: "Other", label: "Other" },
  ]

  // Event types for dropdown
  const eventTypes = [
    { value: "Collage_Level", label: "College Level" },
    { value: "Global_Level", label: "Global Level" },
  ]

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Handle toggle switch
  const handleToggleChange = () => {
    setFormData({
      ...formData,
      registrationRequired: !formData.registrationRequired,
    })
  }

  // Handle category selection
  const handleCategorySelect = (value) => {
    setFormData({
      ...formData,
      category: value,
    })
    setShowCategoryDropdown(false)

    if (errors.category) {
      setErrors({
        ...errors,
        category: "",
      })
    }
  }

  // Handle event type selection
  const handleEventTypeSelect = (value) => {
    setFormData({
      ...formData,
      eventType: value,
    })
    setShowEventTypeDropdown(false)

    if (errors.eventType) {
      setErrors({
        ...errors,
        eventType: "",
      })
    }
  }

  // Handle date selection
  const handleDateSelect = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    })
    setShowCalendar(null)

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  // Generate calendar days
  const generateCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  // Calendar component
  const Calendar = ({ field }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const days = generateCalendarDays(currentYear, currentMonth);
    const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });

    const prevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const nextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 w-64">
        <div className="flex justify-between items-center mb-4">
          <button type="button" onClick={prevMonth} className="text-gray-600 hover:text-gray-800">
            &lt;
          </button>
          <div className="font-semibold">
            {monthName} {currentYear}
          </div>
          <button type="button" onClick={nextMonth} className="text-gray-600 hover:text-gray-800">
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <div key={index} className="text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="h-8 flex items-center justify-center">
              {day ? (
                <button
                  type="button"
                  onClick={() =>
                    handleDateSelect(
                      `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
                      field,
                    )
                  }
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${day === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear()
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {day}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.eventType) {
      newErrors.eventType = "Event type is required"
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required"
    }

    // Validate end date is after start date
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.clubId.trim()) {
      newErrors.clubId = "Club ID is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Create the final event object
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        eventType: formData.eventType,
        startTime: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endTime: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        location: formData.location,
        clubId: formData.clubId,
        registrationRequired: formData.registrationRequired,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
      };

      // Make the API call with axios
      axios.post('/api/event-management/create-event', eventData)
        .then(response => {
          setIsSubmitting(false);
          // Handle successful response
          console.log('Event created successfully:', response.data);

          // Reset form after successful submission
          setFormData({
            title: "",
            description: "",
            category: "",
            startDate: "",
            endDate: "",
            location: "",
            clubId: "",
            eventType: "",
            registrationRequired: false,
            maxParticipants: "",
          });

          // Show success message or redirect
          alert("Event created successfully!");
        })
        .catch(error => {
          setIsSubmitting(false);
          // Handle error
          console.error('Error creating event:', error);

          // Show error message with specific details when available
          if (error.response && error.response.data && error.response.data.message) {
            alert(`Error: ${error.response.data.message}`);
          } else {
            alert("Failed to create event. Please try again.");
          }
        });
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle calendar refs
      if (showCalendar === "startDate" && 
          startDateCalendarRef.current && 
          !startDateCalendarRef.current.contains(event.target)) {
        setShowCalendar(null);
      }
      
      if (showCalendar === "endDate" && 
          endDateCalendarRef.current && 
          !endDateCalendarRef.current.contains(event.target)) {
        setShowCalendar(null);
      }
  
      // Handle category dropdown
      if (categoryRef.current && 
          !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      
      // Handle event type dropdown
      if (eventTypeRef.current && 
          !eventTypeRef.current.contains(event.target)) {
        setShowEventTypeDropdown(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy")
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">Event Registration</h1>
          <p className="text-white/90">Create a new event for your club</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 
                    ${errors.title ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter event title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Category */}
              <div className="relative" ref={categoryRef}>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white cursor-pointer flex justify-between items-center
                    ${errors.category ? "border-red-500" : "border-gray-300"}`}
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  <span className={formData.category ? "text-gray-900" : "text-gray-400"}>
                    {formData.category
                      ? categories.find((c) => c.value === formData.category)?.label
                      : "Select a category"}
                  </span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                    {categories.map((category) => (
                      <div
                        key={category.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCategorySelect(category.value)}
                      >
                        {category.label}
                      </div>
                    ))}
                  </div>
                )}
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
            </div>

            {/* Event Type */}
            <div className="relative" ref={eventTypeRef}>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <div
                className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white cursor-pointer flex justify-between items-center
                  ${errors.eventType ? "border-red-500" : "border-gray-300"}`}
                onClick={() => setShowEventTypeDropdown(!showEventTypeDropdown)}
              >
                <span className={formData.eventType ? "text-gray-900" : "text-gray-400"}>
                  {formData.eventType
                    ? eventTypes.find((c) => c.value === formData.eventType)?.label
                    : "Select event type"}
                </span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {showEventTypeDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                  {eventTypes.map((eventType) => (
                    <div
                      key={eventType.value}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleEventTypeSelect(eventType.value)}
                    >
                      {eventType.label}
                    </div>
                  ))}
                </div>
              )}
              {errors.eventType && <p className="mt-1 text-sm text-red-600">{errors.eventType}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 
                  ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Provide details about the event"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Club ID */}
            <div>
              <label htmlFor="clubId" className="block text-sm font-medium text-gray-700 mb-1">
                Club ID
              </label>
              <input
                type="text"
                id="clubId"
                name="clubId"
                value={formData.clubId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 
                  ${errors.clubId ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your club ID"
              />
              {errors.clubId && <p className="mt-1 text-sm text-red-600">{errors.clubId}</p>}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div className="relative" ref={startDateCalendarRef}>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white cursor-pointer flex justify-between items-center
                  ${errors.startDate ? "border-red-500" : "border-gray-300"}`}
                  onClick={() => setShowCalendar(showCalendar === "startDate" ? null : "startDate")}
                >
                  <span className={formData.startDate ? "text-gray-900" : "text-gray-400"}>
                    {formData.startDate ? formatDate(formData.startDate) : "Select start date"}
                  </span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {showCalendar === "startDate" && (
                  <div className="absolute z-10 mt-1">
                    <Calendar field="startDate" />
                  </div>
                )}
                {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              </div>

              {/* End Date */}
              <div className="relative" ref={endDateCalendarRef}>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div
                  className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white cursor-pointer flex justify-between items-center
                  ${errors.endDate ? "border-red-500" : "border-gray-300"}`}
                  onClick={() => setShowCalendar(showCalendar === "endDate" ? null : "endDate")}
                >
                  <span className={formData.endDate ? "text-gray-900" : "text-gray-400"}>
                    {formData.endDate ? formatDate(formData.endDate) : "Select end date"}
                  </span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {showCalendar === "endDate" && (
                  <div className="absolute z-10 mt-1">
                    <Calendar field="endDate" />
                  </div>
                )}
                {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 
                  ${errors.location ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter event location"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            {/* Registration Required and Max Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration Required */}
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Registration Required</h3>
                  <p className="text-sm text-gray-500">Do participants need to register for this event?</p>
                </div>
                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={handleToggleChange}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
                    ${formData.registrationRequired ? "bg-orange-500" : "bg-gray-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                      ${formData.registrationRequired ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              {/* Max Participants */}
              <div>
                <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Leave empty for unlimited"
                />
                <p className="mt-1 text-sm text-gray-500">Maximum number of participants allowed</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border border-purple-500 text-purple-500 hover:bg-purple-50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onClick={() => {
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  startDate: "",
                  endDate: "",
                  location: "",
                  clubId: "",
                  eventType: "",
                  registrationRequired: false,
                  maxParticipants: "",
                })
                setErrors({})
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}