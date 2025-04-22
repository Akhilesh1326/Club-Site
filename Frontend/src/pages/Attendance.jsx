"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Mail as MailIcon,
  QrCode as QrCodeIcon,
  FileCopy as FileCopyIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"

// Mock data for event
const mockEvent = {
  id: "evt-123456",
  title: "Hackathon",
  description: "Join us for the latest in technology trends and networking opportunities",
  startTime: "2025-04-15T09:00:00Z",
  endTime: "2025-04-15T17:00:00Z",
  location: "Tech Convention Center, 123 Innovation Ave",
  organizerId: "org-789012",
  capacity: 200,
  status: "active"
}

// Mock data for participants
const mockParticipants = [
  {
    id: "part-001",
    name: "John Smith",
    email: "john.smith@example.com",
    registrationDate: "2025-03-10T14:23:45Z",
    status: "present",
    checkInTime: "2025-04-15T08:45:32Z"
  },
  {
    id: "part-002",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    registrationDate: "2025-03-11T09:12:30Z",
    status: "present",
    checkInTime: "2025-04-15T08:52:17Z"
  },
  {
    id: "part-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    registrationDate: "2025-03-12T16:05:22Z",
    status: "absent",
    checkInTime: null
  },
  {
    id: "part-004",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    registrationDate: "2025-03-15T11:34:19Z",
    status: null,
    checkInTime: null
  },
  {
    id: "part-005",
    name: "Robert Davis",
    email: "robert.d@example.com",
    registrationDate: "2025-03-18T10:45:06Z",
    status: "present",
    checkInTime: "2025-04-15T09:05:41Z"
  },
  {
    id: "part-006",
    name: "Jennifer Wilson",
    email: "jennifer.w@example.com",
    registrationDate: "2025-03-20T14:22:50Z",
    status: null,
    checkInTime: null
  },
  {
    id: "part-007",
    name: "David Miller",
    email: "david.m@example.com",
    registrationDate: "2025-03-22T09:33:27Z",
    status: "absent",
    checkInTime: null
  },
  {
    id: "part-008",
    name: "Lisa Taylor",
    email: "lisa.t@example.com",
    registrationDate: "2025-03-25T15:17:39Z",
    status: "present",
    checkInTime: "2025-04-15T08:48:53Z"
  }
]

// QR Code reader component
const QRScanner = ({ onScan, onClose }) => {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="subtitle1" gutterBottom>
        Scan participant QR code
      </Typography>
      <Box sx={{ height: 300, border: "1px dashed #ccc", mb: 2, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <QrCodeIcon sx={{ fontSize: 80, color: "#ccc" }} />
          <Typography variant="body2" color="text.secondary">
            Camera feed would appear here
          </Typography>
        </Box>
      </Box>
      <Button variant="contained" color="error" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  )
}

export default function EventAttendancePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const eventId = location.state?.eventId || "evt-123456" // Default to mock eventId if not provided
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [event, setEvent] = useState(null)
  const [participants, setParticipants] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [anchorEl, setAnchorEl] = useState(null)
  const [stats, setStats] = useState({
    totalRegistered: 0,
    present: 0,
    absent: 0,
    attendanceRate: 0,
  })

  // Load mock data instead of fetching from API
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      try {
        // Set mock event data
        setEvent(mockEvent)
        
        // Set mock participants data
        setParticipants(mockParticipants)
        
        // Calculate stats from mock data
        const total = mockParticipants.length
        const presentCount = mockParticipants.filter(p => p.status === "present").length
        const absentCount = mockParticipants.filter(p => p.status === "absent").length
        const rate = total > 0 ? (presentCount / total) * 100 : 0
        
        setStats({
          totalRegistered: total,
          present: presentCount,
          absent: absentCount,
          attendanceRate: rate.toFixed(1),
        })
        
        setLoading(false)
      } catch (err) {
        console.error("Error loading mock data:", err)
        setError("Failed to load event data. Please try again.")
        setLoading(false)
      }
    }, 800) // Simulate network delay
    
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleMarkAttendance = async (participantId, status) => {
    try {
      // Update local state only (no API call)
      setParticipants(
        participants.map((p) =>
          p.id === participantId ? { ...p, status, checkInTime: status === "present" ? new Date().toISOString() : null } : p
        )
      )

      // Update stats
      const updatedParticipants = participants.map(p => 
        p.id === participantId ? { ...p, status } : p
      )
      const total = updatedParticipants.length
      const presentCount = updatedParticipants.filter(p => p.status === "present").length
      const absentCount = updatedParticipants.filter(p => p.status === "absent").length
      const rate = total > 0 ? (presentCount / total) * 100 : 0

      setStats({
        totalRegistered: total,
        present: presentCount,
        absent: absentCount,
        attendanceRate: rate.toFixed(1),
      })

      // Show success message
      setSnackbar({
        open: true,
        message: `Attendance marked as ${status} for ${participants.find((p) => p.id === participantId)?.name}`,
        severity: "success",
      })
    } catch (err) {
      console.error("Error updating attendance:", err)
      setSnackbar({
        open: true,
        message: "Failed to update attendance. Please try again.",
        severity: "error",
      })
    }
  }

  const handleQRScan = (data) => {
    // Simulate QR scan - use the first participant as an example
    const participantToMark = participants[0]
    handleMarkAttendance(participantToMark.id, "present")
    setShowQRScanner(false)
    
    // In a real app, 'data' would contain the scanned participant ID
    setSnackbar({
      open: true,
      message: `QR code scanned successfully for ${participantToMark.name}`,
      severity: "success",
    })
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleExportAttendance = () => {
    // Simulate export - just show success message
    setSnackbar({
      open: true,
      message: "Attendance data exported successfully",
      severity: "success",
    })
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSendReminders = async () => {
    // Simulate sending reminders - just show success message
    setSnackbar({
      open: true,
      message: "Reminders sent successfully to registered participants",
      severity: "success",
    })
    handleMenuClose()
  }

  // Filter participants based on search query and tab
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch = participant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        participant.email?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (tabValue === 0) return matchesSearch // All
    if (tabValue === 1) return matchesSearch && participant.status === "present" // Present
    if (tabValue === 2) return matchesSearch && participant.status === "absent" // Absent
    if (tabValue === 3) return matchesSearch && !participant.status // Not recorded
    
    return matchesSearch
  })

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Format time for display
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/events")}
          sx={{ mt: 2 }}
        >
          Back to Events
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/events")}
        sx={{ mb: 2 }}
      >
        Back to Events
      </Button>

      {/* Event Details Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" component="h1" gutterBottom>
                {event?.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EventIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">{formatDate(event?.startTime)}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">
                  {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <RoomIcon sx={{ mr: 1, color: "text.secondary" }} />
                <Typography variant="body1">{event?.location}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Attendance Summary
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Total Registered:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {stats.totalRegistered}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Present:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    {stats.present} ({stats.attendanceRate}%)
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Absent:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="error.main">
                    {stats.absent}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Attendance Management Section */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">Attendance Management</Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<QrCodeIcon />}
                onClick={() => setShowQRScanner(true)}
                sx={{ mr: 1 }}
              >
                Scan QR
              </Button>
              <Button
                variant="outlined"
                startIcon={<MoreVertIcon />}
                onClick={handleMenuOpen}
              >
                Actions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleExportAttendance}>
                  <ListItemIcon>
                    <DownloadIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Export Attendance</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSendReminders}>
                  <ListItemIcon>
                    <MailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Send Reminders</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <FileCopyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Generate Certificates</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Search and Filter */}
          <Box sx={{ display: "flex", mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search participants..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 2 }}
            />
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </Box>

          {/* Tabs for filtering */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
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
              <Tab label="All Participants" />
              <Tab label="Present" />
              <Tab label="Absent" />
              <Tab label="Not Recorded" />
            </Tabs>
          </Box>

          {/* Participants Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Registration Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check-in Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        {participant.registrationDate
                          ? new Date(participant.registrationDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {participant.status === "present" ? (
                          <Chip 
                            label="Present" 
                            color="success" 
                            size="small" 
                            icon={<CheckCircleIcon />} 
                          />
                        ) : participant.status === "absent" ? (
                          <Chip 
                            label="Absent" 
                            color="error" 
                            size="small" 
                            icon={<CancelIcon />} 
                          />
                        ) : (
                          <Chip 
                            label="Not Recorded" 
                            color="default" 
                            size="small" 
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {participant.checkInTime
                          ? new Date(participant.checkInTime).toLocaleString()
                          : "—"}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          onClick={() => handleMarkAttendance(participant.id, "present")}
                          sx={{ mr: 1 }}
                        >
                          Mark Present
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleMarkAttendance(participant.id, "absent")}
                        >
                          Mark Absent
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        No participants found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* QR Scanner Dialog */}
      <Dialog open={showQRScanner} onClose={() => setShowQRScanner(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Scan Attendance</DialogTitle>
        <DialogContent>
          <QRScanner
            onScan={() => handleQRScan("part-001")} // Mocked QR scan with first participant ID
            onClose={() => setShowQRScanner(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}