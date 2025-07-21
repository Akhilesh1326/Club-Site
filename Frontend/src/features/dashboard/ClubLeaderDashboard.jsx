"use client"



import { useState } from "react"
import {AppBar,Badge,Box,Button,Card,CardContent,CardHeader,Chip,Container,Drawer,Grid,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Stack,Tab,Tabs,TextField,Toolbar,Typography,
} from "@mui/material"
import {
  Bell,
  Calendar,
  ChevronDown,
  Home,
  PieChart,
  Settings,
  Users,
  UserPlus,
  MessageCircle,
  Plus,
  Send,
  User,
} from "lucide-react"
import  MembersSection  from "../../components/MemberSection"
import  SettingsSection  from "../../components/SettingsSection"
import  AnalyticsSection  from "../../components/AnalyticsSection"
import  AdminProfile  from "../../components/profile/AdminProfile"
import  ModeratorProfile  from "../../components/profile/ModeratorProfile"
import  ProfileSection from "../../components/ProfileSection"


// TabPanel component for tab content
function TabPanel(props) {
    const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ClubLeaderDashboard() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const drawerWidth = 240

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            ClubHub
          </Typography>
        </Box>
        <List sx={{ mt: 2 }}>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 0} onClick={() => setActiveTab(0)}>
              <ListItemIcon>
                <Home size={20} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 1} onClick={() => setActiveTab(1)}>
              <ListItemIcon>
                <Calendar size={20} />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 2} onClick={() => setActiveTab(2)}>
              <ListItemIcon>
                <PieChart size={20} />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 3} onClick={() => setActiveTab(3)}>
              <ListItemIcon>
                <Users size={20} />
              </ListItemIcon>
              <ListItemText primary="Members" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 4} onClick={() => setActiveTab(4)}>
              <ListItemIcon>
                <Settings size={20} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 5} onClick={() => setActiveTab(5)}>
              <ListItemIcon>
                <User size={20} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Header */}
        <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: "white" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            <Button color="inherit" endIcon={<ChevronDown size={16} />} onClick={() => setActiveTab(5)}>
              John Doe
            </Button>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Home" />
            <Tab label="Events" />
            <Tab label="Analytics" />
            <Tab label="Members" />
            <Tab label="Settings" />
            <Tab label="Profile" />
          </Tabs>

          {/* Home Tab */}
          <TabPanel value={activeTab} index={0}>
            <Card sx={{ mb: 4 }}>
              <CardHeader title="Welcome Back, John!" subheader="Here's what's happening with your club" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Total Members
                          </Typography>
                          <Users size={16} color="#6e6e6e" />
                        </Box>
                        <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                          1,234
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          +20% from last month
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Upcoming Events
                          </Typography>
                          <Calendar size={16} color="#6e6e6e" />
                        </Box>
                        <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                          3
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Next event in 2 days
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            New Members
                          </Typography>
                          <UserPlus size={16} color="#6e6e6e" />
                        </Box>
                        <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                          28
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          This week
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Active Discussions
                          </Typography>
                          <MessageCircle size={16} color="#6e6e6e" />
                        </Box>
                        <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                          12
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          5 new since yesterday
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Recent Activities" />
                  <CardContent>
                    <List>
                      <ListItem>
                        <Chip label="Event" size="small" sx={{ mr: 1, bgcolor: "#e3f2fd", color: "#1976d2" }} />
                        <Typography>Tech Talk: AI in 2023 was created</Typography>
                      </ListItem>
                      <ListItem>
                        <Chip label="Member" size="small" sx={{ mr: 1, bgcolor: "#e8f5e9", color: "#2e7d32" }} />
                        <Typography>Sarah Johnson joined the club</Typography>
                      </ListItem>
                      <ListItem>
                        <Chip label="Post" size="small" sx={{ mr: 1, bgcolor: "#fff8e1", color: "#f57f17" }} />
                        <Typography>New announcement: Summer Hackathon</Typography>
                      </ListItem>
                      <ListItem>
                        <Chip label="Discussion" size="small" sx={{ mr: 1, bgcolor: "#f3e5f5", color: "#7b1fa2" }} />
                        <Typography>Hot topic: Future of Web Development</Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Upcoming Events" />
                  <CardContent>
                    <List>
                      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Tech Talk: AI in 2023</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Jun 15
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Summer Hackathon</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Jul 1-3
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Workshop: Intro to React</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Jul 10
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ mt: 3 }}>
              <CardHeader title="Quick Actions" />
              <CardContent>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button variant="contained" startIcon={<Plus size={16} />}>
                    Create Event
                  </Button>
                  <Button variant="outlined" startIcon={<Send size={16} />}>
                    Send Announcement
                  </Button>
                  <Button variant="outlined" startIcon={<Users size={16} />}>
                    Invite Members
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Events Tab */}
          <TabPanel value={activeTab} index={1}>
            <Card>
              <CardHeader title="Create Event" />
              <CardContent>
                <Box component="form" sx={{ "& .MuiTextField-root": { mb: 2 } }}>
                  <TextField fullWidth id="eventName" label="Event Name" placeholder="Enter event name" />
                  <TextField
                    fullWidth
                    id="eventDate"
                    label="Event Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    id="eventDescription"
                    label="Event Description"
                    placeholder="Describe your event"
                    multiline
                    rows={4}
                  />
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Create Event
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Analytics Tab */}
          <TabPanel value={activeTab} index={2}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Members
                      </Typography>
                      <Users size={16} color="#6e6e6e" />
                    </Box>
                    <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                      1,234
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      +20% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Event Attendance
                      </Typography>
                      <Calendar size={16} color="#6e6e6e" />
                    </Box>
                    <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                      573
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      +5% from last event
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Page Visits
                      </Typography>
                      <PieChart size={16} color="#6e6e6e" />
                    </Box>
                    <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                      2,345
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      +10% from last week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Active Members
                      </Typography>
                      <Users size={16} color="#6e6e6e" />
                    </Box>
                    <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                      789
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      +15% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <AnalyticsSection />
          </TabPanel>

          {/* Members Tab */}
          <TabPanel value={activeTab} index={3}>
            <MembersSection />
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel value={activeTab} index={4}>
            <SettingsSection />
          </TabPanel>

          {/* Profile Tab */}
          <TabPanel value={activeTab} index={5}>
            <ProfileSection userRole="Moderator" />
          </TabPanel>
        </Container>
      </Box>
    </Box>
  )
}

