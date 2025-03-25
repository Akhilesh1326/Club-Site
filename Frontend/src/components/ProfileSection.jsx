"use client"

import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import {
  Award,
  Calendar,
  Edit,
  FileText,
  Key,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  User,
  Users,
} from "lucide-react"

// Sample user profiles for different roles
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



// TabPanel component for profile tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ProfileSection({ userRole = "Member" }) {
  const [tabValue, setTabValue] = useState(0)
  const [editMode, setEditMode] = useState(false)

  // Select profile based on role
  let profile
  switch (userRole) {
    case "Admin":
      profile = adminProfile
      break
    case "Moderator":
      profile = moderatorProfile
      break
    default:
      profile = memberProfile
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Role-specific color
  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return { bg: "#f3e5f5", color: "#7b1fa2" } // Purple
      case "Moderator":
        return { bg: "#e3f2fd", color: "#1976d2" } // Blue
      default:
        return { bg: "#e8f5e9", color: "#2e7d32" } // Green
    }
  }

  const roleColor = getRoleColor(profile.role)

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {/* Profile Header with Cover Image */}
          <Box
            sx={{
              height: 150,
              bgcolor: roleColor.bg,
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              px: 3,
              pb: 7,
            }}
          >
            <Avatar
              src={profile.avatar}
              sx={{
                width: 120,
                height: 120,
                border: "4px solid white",
                position: "absolute",
                bottom: -50,
                left: 30,
              }}
            />

            <Box sx={{ ml: 16, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {profile.name}
              </Typography>
              <Chip
                label={profile.role}
                sx={{
                  bgcolor: roleColor.bg,
                  color: roleColor.color,
                  fontWeight: "bold",
                }}
              />
            </Box>

            <Button
              variant="contained"
              startIcon={<Edit size={16} />}
              sx={{ position: "absolute", right: 16, bottom: 16 }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Save Profile" : "Edit Profile"}
            </Button>
          </Box>

          {/* Profile Navigation */}
          <Box sx={{ px: 3, pt: 7 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Overview" />
              <Tab label="Activities" />
              <Tab label="Settings" />
              {userRole === "Admin" && <Tab label="Admin" />}
            </Tabs>
          </Box>
        </CardContent>
      </Card>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Left Column - Personal Info */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Personal Information" />
              <CardContent>
                {editMode ? (
                  <Stack spacing={2}>
                    <TextField label="Name" defaultValue={profile.name} fullWidth />
                    <TextField label="Email" defaultValue={profile.email} fullWidth />
                    <TextField label="Phone" defaultValue={profile.phone} fullWidth />
                    <TextField label="Location" defaultValue={profile.location} fullWidth />
                    <TextField label="Bio" defaultValue={profile.bio} fullWidth multiline rows={4} />
                  </Stack>
                ) : (
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Mail size={20} />
                      </ListItemIcon>
                      <ListItemText primary={profile.email} secondary="Email" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone size={20} />
                      </ListItemIcon>
                      <ListItemText primary={profile.phone} secondary="Phone" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MapPin size={20} />
                      </ListItemIcon>
                      <ListItemText primary={profile.location} secondary="Location" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Calendar size={20} />
                      </ListItemIcon>
                      <ListItemText primary={profile.joinDate} secondary="Member Since" />
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                    <ListItem>
                      <ListItemIcon>
                        <User size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Bio"
                        secondary={profile.bio}
                        secondaryTypographyProps={{
                          style: { whiteSpace: "normal" },
                        }}
                      />
                    </ListItem>
                  </List>
                )}
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardHeader title="Skills & Interests" />
              <CardContent>
                {editMode ? (
                  <Stack spacing={2}>
                    <TextField label="Skills (comma separated)" defaultValue={profile.skills.join(", ")} fullWidth />
                    <TextField
                      label="Interests (comma separated)"
                      defaultValue={profile.interests.join(", ")}
                      fullWidth
                    />
                  </Stack>
                ) : (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Skills
                    </Typography>
                    <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {profile.skills.map((skill, index) => (
                        <Chip key={index} label={skill} size="small" />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" gutterBottom>
                      Interests
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {profile.interests.map((interest, index) => (
                        <Chip key={index} label={interest} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Stats & Activities */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Club Statistics" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
                      <Calendar size={24} style={{ marginBottom: 8 }} />
                      <Typography variant="h4">{profile.eventsAttended}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Events Attended
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
                      <Star size={24} style={{ marginBottom: 8 }} />
                      <Typography variant="h4">{profile.eventsOrganized}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Events Organized
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper elevation={0} sx={{ p: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
                      <Award size={24} style={{ marginBottom: 8 }} />
                      <Typography variant="h4">{profile.contributions}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contributions
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardHeader title="Recent Activities" />
              <CardContent>
                <List>
                  {profile.recentActivities.map((activity, index) => (
                    <ListItem key={index} divider={index < profile.recentActivities.length - 1}>
                      <ListItemIcon>
                        <Chip
                          label={activity.type}
                          size="small"
                          sx={{
                            bgcolor:
                              activity.type === "Event"
                                ? "#e3f2fd"
                                : activity.type === "Member"
                                  ? "#e8f5e9"
                                  : activity.type === "Post"
                                    ? "#fff8e1"
                                    : "#f3e5f5",
                            color:
                              activity.type === "Event"
                                ? "#1976d2"
                                : activity.type === "Member"
                                  ? "#2e7d32"
                                  : activity.type === "Post"
                                    ? "#f57f17"
                                    : "#7b1fa2",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={activity.description} secondary={activity.date} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Role-specific information */}
            {(userRole === "Admin" || userRole === "Moderator") && (
              <Card sx={{ mt: 3 }}>
                <CardHeader title={`${userRole} Permissions`} />
                <CardContent>
                  <List>
                    {profile.permissions.map((permission, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Key size={20} />
                        </ListItemIcon>
                        <ListItemText primary={permission} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Activities Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Event History" />
              <CardContent>
                <List>
                  <ListItem divider>
                    <ListItemText primary="React Workshop" secondary="Attended • May 15, 2023" />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary="Summer Hackathon" secondary="Attended • July 1-3, 2023" />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText
                      primary="Tech Talk: AI in 2023"
                      secondary={userRole === "Admin" ? "Organized • June 15, 2023" : "Attended • June 15, 2023"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Workshop: Intro to React"
                      secondary={userRole === "Moderator" ? "Co-organized • July 10, 2023" : "Attended • July 10, 2023"}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Contributions" />
              <CardContent>
                <List>
                  {userRole === "Admin" && (
                    <>
                      <ListItem divider>
                        <ListItemIcon>
                          <Users size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Approved 5 new member applications" secondary="1 week ago" />
                      </ListItem>
                      <ListItem divider>
                        <ListItemIcon>
                          <FileText size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Published Summer Hackathon announcement" secondary="2 weeks ago" />
                      </ListItem>
                    </>
                  )}

                  {userRole === "Moderator" && (
                    <>
                      <ListItem divider>
                        <ListItemIcon>
                          <Shield size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Moderated Design Thinking workshop" secondary="3 days ago" />
                      </ListItem>
                      <ListItem divider>
                        <ListItemIcon>
                          <Users size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Welcomed 3 new members" secondary="1 week ago" />
                      </ListItem>
                    </>
                  )}

                  <ListItem divider>
                    <ListItemIcon>
                      <FileText size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Shared article on JavaScript best practices" secondary="1 month ago" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Users size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Participated in Code Review session" secondary="2 weeks ago" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Settings Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Account Settings" />
              <CardContent>
                <Stack spacing={3}>
                  <TextField label="Email" defaultValue={profile.email} fullWidth />
                  <TextField label="Password" type="password" defaultValue="********" fullWidth />
                  <TextField label="Phone" defaultValue={profile.phone} fullWidth />
                  <Button variant="contained">Update Account</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Notification Preferences" />
              <CardContent>
                <List>
                  <ListItem divider>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive emails about events, announcements, and mentions"
                    />
                    <Chip label="Enabled" color="success" size="small" />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary="Push Notifications" secondary="Receive push notifications on your devices" />
                    <Chip label="Enabled" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="SMS Notifications" secondary="Receive text messages for important updates" />
                    <Chip label="Disabled" color="default" size="small" />
                  </ListItem>
                </List>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardHeader title="Privacy Settings" />
              <CardContent>
                <List>
                  <ListItem divider>
                    <ListItemText primary="Profile Visibility" secondary="Who can see your profile information" />
                    <Chip label="Club Members" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Contact Information" secondary="Who can see your contact information" />
                    <Chip label="Admins Only" size="small" />
                  </ListItem>
                </List>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Update Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Admin Tab - Only visible to Admins */}
      {userRole === "Admin" && (
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Club Management" />
                <CardContent>
                  <List>
                    <ListItem button divider>
                      <ListItemIcon>
                        <Users size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Manage Member Roles" />
                    </ListItem>
                    <ListItem button divider>
                      <ListItemIcon>
                        <Shield size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Moderation Settings" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <Key size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Permission Management" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Club Analytics" />
                <CardContent>
                  <List>
                    <ListItem button divider>
                      <ListItemIcon>
                        <Users size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Membership Growth" secondary="View detailed membership statistics" />
                    </ListItem>
                    <ListItem button divider>
                      <ListItemIcon>
                        <Calendar size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Event Analytics" secondary="Track event attendance and engagement" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <FileText size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Content Performance" secondary="Analyze engagement with club content" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      )}
    </Box>
  )
}

