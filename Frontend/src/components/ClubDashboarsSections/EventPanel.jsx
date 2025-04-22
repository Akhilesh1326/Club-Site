"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  CalendarMonth as CalendarMonthIcon,
  People as PeopleIcon,
  HowToReg as HowToRegIcon,
} from "@mui/icons-material"

import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function EventsPanel({ clubName = "Chess Club" }) {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        const response = await axios.get("/api/event-management/events")
        console.log(response.data)
        setEvents(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again later.")
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  // Navigate to event attendance page
  const handleAttendanceClick = (eventId) => {
    console.log("Event id = ",eventId)
    navigate(`/attendance`, { state: { eventId } })

  }

  // Format date string to local date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Format time string from ISO to readable format
  const formatTime = (startTime, endTime) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    
    return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }

  // Determine if event is upcoming or past
  const isUpcoming = (endTime) => {
    return new Date(endTime) > new Date()
  }

  // Filter events into upcoming and past based on endTime
  const upcomingEvents = events.filter(event => isUpcoming(event.endTime))
  const pastEvents = events.filter(event => !isUpcoming(event.endTime))

  return (
    <Box>
      <Card className="mb-4">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography variant="h6" component="div">
                {clubName} Events
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={()=>{navigate("/event-register")}}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Create Event
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "#f97316", // orange-500
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#f97316", // orange-500
                },
              }}
            >
              <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Upcoming Events" />
              <Tab icon={<EventIcon />} iconPosition="start" label="Past Events" />
            </Tabs>
          </Box>

          {loading && (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography>Loading events...</Typography>
            </Box>
          )}

          {error && (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}

          {/* Upcoming Events Tab */}
          <Box role="tabpanel" hidden={tabValue !== 0} className="mt-4">
            {tabValue === 0 && !loading && !error && (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Attendees</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{formatDate(event.startTime)}</TableCell>
                          <TableCell>{formatTime(event.startTime, event.endTime)}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.category}</TableCell>
                          <TableCell>
                            <Box className="flex items-center gap-1">
                              <PeopleIcon fontSize="small" className="text-gray-500" />
                              <Typography variant="body2">
                                {event.participants ? event.participants.length : 0} / {event.maxParticipants || "∞"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Manage Attendance">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<HowToRegIcon />}
                                onClick={() => handleAttendanceClick(event.id)}
                                sx={{ 
                                  mr: 1,
                                  backgroundColor: "#8b5cf6", // purple-500
                                  "&:hover": {
                                    backgroundColor: "#7c3aed", // purple-600
                                  }
                                }}
                              >
                                Attendance
                              </Button>
                            </Tooltip>
                            <IconButton size="small" className="text-purple-500">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No upcoming events found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>

          {/* Past Events Tab */}
          <Box role="tabpanel" hidden={tabValue !== 1} className="mt-4">
            {tabValue === 1 && !loading && !error && (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Attendees</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pastEvents.length > 0 ? (
                      pastEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{formatDate(event.startTime)}</TableCell>
                          <TableCell>{formatTime(event.startTime, event.endTime)}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.category}</TableCell>
                          <TableCell>
                            <Box className="flex items-center gap-1">
                              <PeopleIcon fontSize="small" className="text-gray-500" />
                              <Typography variant="body2">
                                {event.participants ? event.participants.length : 0} / {event.maxParticipants || "∞"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="View Attendance">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<HowToRegIcon />}
                                onClick={() => handleAttendanceClick(event.id)}
                                sx={{ 
                                  mr: 1,
                                  backgroundColor: "#8b5cf6", // purple-500
                                  "&:hover": {
                                    backgroundColor: "#7c3aed", // purple-600
                                  }
                                }}
                              >
                                Attendance
                              </Button>
                            </Tooltip>
                            <IconButton size="small" className="text-purple-500">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No past events found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Create Event Dialog remains the same */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Box component="form" className="space-y-4 mt-2">
            <TextField fullWidth label="Event Name" variant="outlined" required />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
            <TextField fullWidth label="Location" variant="outlined" required />
            <TextField fullWidth label="Description" variant="outlined" multiline rows={3} />
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select label="Event Type" defaultValue="tournament">
                <MenuItem value="tournament">Tournament</MenuItem>
                <MenuItem value="workshop">Workshop</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="social">Social Event</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="border-purple-500 text-purple-500 hover:bg-purple-50">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} className="bg-orange-500 hover:bg-orange-600 text-white">
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}