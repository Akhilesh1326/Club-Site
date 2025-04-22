"use client"


import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import {
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  PermMedia as MediaIcon,
} from "@mui/icons-material"

export default function SettingsPanel({ clubName = "Chess Club" }) {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      <Card className="mb-4">
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
              <Tab icon={<PaletteIcon />} iconPosition="start" label="Club Settings" />
              <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" />
              <Tab icon={<MediaIcon />} iconPosition="start" label="Media & Resources" />
            </Tabs>
          </Box>
        </CardContent>
      </Card>

      {/* Club Settings Tab */}
      <Box role="tabpanel" hidden={tabValue !== 0}>
        {tabValue === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" className="mb-4">
                Club Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Club Name" defaultValue={clubName} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Club Description"
                    multiline
                    rows={4}
                    defaultValue="The Chess Club is dedicated to promoting the game of chess among university students. We welcome players of all skill levels, from beginners to advanced."
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Meeting Day" defaultValue="Wednesday" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Meeting Time" defaultValue="5:00 PM - 7:00 PM" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Meeting Location"
                    defaultValue="Student Center, Room 203"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider className="my-2" />
                  <Typography variant="subtitle1" gutterBottom>
                    Privacy Settings
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Make club visible in university directory"
                  />
                  <FormControlLabel control={<Switch defaultChecked />} label="Allow members to invite others" />
                  <FormControlLabel control={<Switch />} label="Require approval for new members" />
                </Grid>
                <Grid item xs={12} className="flex justify-end">
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Notifications Tab */}
      <Box role="tabpanel" hidden={tabValue !== 1}>
        {tabValue === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" className="mb-4">
                Notification Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Email Notifications" secondary="Send email notifications to all members" />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Event Reminders" secondary="Send reminders 24 hours before events" />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="New Member Alerts" secondary="Notify officers when new members join" />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Tournament Results" secondary="Send results to all participants" />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Weekly Updates" secondary="Send weekly club updates to all members" />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Box className="flex justify-end mt-4">
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Save Preferences
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Media & Resources Tab */}
      <Box role="tabpanel" hidden={tabValue !== 2}>
        {tabValue === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" className="mb-4">
                Media & Resources
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Club Logo
                  </Typography>
                  <Box className="flex items-center gap-4 mb-4">
                    <Box className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                      <Typography variant="body2" color="text.secondary">
                        Logo Preview
                      </Typography>
                    </Box>
                    <Button variant="outlined" className="border-purple-500 text-purple-500 hover:bg-purple-50">
                      Upload New Logo
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Club Banner
                  </Typography>
                  <Box className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                    <Typography variant="body2" color="text.secondary">
                      Banner Preview
                    </Typography>
                  </Box>
                  <Button variant="outlined" className="border-purple-500 text-purple-500 hover:bg-purple-50">
                    Upload New Banner
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider className="my-2" />
                  <Typography variant="subtitle1" gutterBottom>
                    Club Resources
                  </Typography>
                  <Box className="space-y-2">
                    <TextField
                      fullWidth
                      label="Resource Name"
                      placeholder="e.g., Beginner's Guide"
                      variant="outlined"
                    />
                    <Box className="flex gap-2">
                      <Button variant="outlined" className="border-purple-500 text-purple-500 hover:bg-purple-50">
                        Upload File
                      </Button>
                      <Button variant="contained" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Add Resource
                      </Button>
                    </Box>
                  </Box>
                  <List className="mt-4">
                    <ListItem>
                      <ListItemText
                        primary="Chess Rules for Beginners"
                        secondary="PDF • 2.4 MB • Uploaded 3 weeks ago"
                      />
                      <ListItemSecondaryAction>
                        <Button size="small" className="text-purple-500">
                          View
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Tournament Guidelines" secondary="PDF • 1.8 MB • Uploaded 2 months ago" />
                      <ListItemSecondaryAction>
                        <Button size="small" className="text-purple-500">
                          View
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Chess Strategy Slides" secondary="PPTX • 5.2 MB • Uploaded 1 month ago" />
                      <ListItemSecondaryAction>
                        <Button size="small" className="text-purple-500">
                          View
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  )
}
