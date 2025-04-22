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
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Chip,
} from "@mui/material"
import {
  Edit as EditIcon,
  Save as SaveIcon,
  EmojiEvents as TrophyIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material"

export default function ClubInfoPanel({ clubName = "Chess Club" }) {
  const [editing, setEditing] = useState(false)
  const [clubInfo] = useState({
    name: "Chess Club",
    founded: "September 2020",
    description:
      "The Chess Club is dedicated to promoting the game of chess among university students. We welcome players of all skill levels, from beginners to advanced. Our club hosts regular tournaments, training sessions, and social events.",
    meetingTime: "Wednesdays, 5:00 PM - 7:00 PM",
    location: "Student Center, Room 203",
    email: "chessclub@university.edu",
    website: "university.edu/clubs/chess",
    socialMedia: {
      instagram: "@uni_chess_club",
      twitter: "@uni_chess",
    },
  })

  const [leadershipTeam] = useState([
    { id: 1, name: "Alex Johnson", role: "President", avatar: "A" },
    { id: 2, name: "Emily Wilson", role: "Vice President", avatar: "E" },
    { id: 3, name: "Michael Chen", role: "Treasurer", avatar: "M" },
    { id: 4, name: "Sarah Lee", role: "Secretary", avatar: "S" },
  ])

  const [achievements] = useState([
    { id: 1, title: "University Chess Championship", year: "2024", place: "1st Place" },
    { id: 2, title: "Regional Collegiate Tournament", year: "2023", place: "2nd Place" },
    { id: 3, title: "Best Club Award", year: "2023", place: "Winner" },
    { id: 4, title: "Charity Chess Marathon", year: "2022", place: "Organizer" },
  ])

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Club Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="div">
                  Club Details
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={editing ? <SaveIcon /> : <EditIcon />}
                  onClick={() => setEditing(!editing)}
                  className="border-purple-500 text-purple-500 hover:bg-purple-50"
                >
                  {editing ? "Save" : "Edit"}
                </Button>
              </Box>
              <Grid container spacing={3}>
                {editing ? (
                  <>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Club Name" defaultValue={clubInfo.name} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Founded" defaultValue={clubInfo.founded} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Meeting Time"
                        defaultValue={clubInfo.meetingTime}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Location" defaultValue={clubInfo.location} variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        defaultValue={clubInfo.description}
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email" defaultValue={clubInfo.email} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Website" defaultValue={clubInfo.website} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Instagram"
                        defaultValue={clubInfo.socialMedia.instagram}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Twitter"
                        defaultValue={clubInfo.socialMedia.twitter}
                        variant="outlined"
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom>
                        {clubInfo.name}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {clubInfo.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} className="p-4 bg-gray-50">
                        <Box className="flex items-center gap-2 mb-2">
                          <CalendarIcon className="text-orange-500" />
                          <Typography variant="subtitle1">Founded</Typography>
                        </Box>
                        <Typography variant="body2">{clubInfo.founded}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} className="p-4 bg-gray-50">
                        <Box className="flex items-center gap-2 mb-2">
                          <TimeIcon className="text-orange-500" />
                          <Typography variant="subtitle1">Meeting Time</Typography>
                        </Box>
                        <Typography variant="body2">{clubInfo.meetingTime}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper elevation={0} className="p-4 bg-gray-50">
                        <Box className="flex items-center gap-2 mb-2">
                          <LocationIcon className="text-orange-500" />
                          <Typography variant="subtitle1">Location</Typography>
                        </Box>
                        <Typography variant="body2">{clubInfo.location}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider className="my-2" />
                      <Typography variant="subtitle1" gutterBottom>
                        Contact Information
                      </Typography>
                      <Box className="flex flex-col gap-1">
                        <Typography variant="body2">Email: {clubInfo.email}</Typography>
                        <Typography variant="body2">Website: {clubInfo.website}</Typography>
                        <Typography variant="body2">Instagram: {clubInfo.socialMedia.instagram}</Typography>
                        <Typography variant="body2">Twitter: {clubInfo.socialMedia.twitter}</Typography>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Leadership Team */}
        <Grid item xs={12} md={4}>
          <Card className="mb-4">
            <CardContent>
              <Typography variant="h6" component="div" className="mb-4">
                Leadership Team
              </Typography>
              <List>
                {leadershipTeam.map((leader) => (
                  <ListItem key={leader.id}>
                    <ListItemAvatar>
                      <Avatar>{leader.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={leader.name} secondary={leader.role} />
                  </ListItem>
                ))}
              </List>
              <Box className="flex justify-center mt-2">
                <Button
                  variant="outlined"
                  size="small"
                  className="border-purple-500 text-purple-500 hover:bg-purple-50"
                >
                  Manage Team
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="div">
                  Achievements
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  className="border-purple-500 text-purple-500 hover:bg-purple-50"
                >
                  Add New
                </Button>
              </Box>
              <List>
                {achievements.map((achievement) => (
                  <ListItem key={achievement.id}>
                    <ListItemAvatar>
                      <Avatar className="bg-orange-500">
                        <TrophyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <Box className="flex items-center gap-1 mt-1">
                          <Chip label={achievement.year} size="small" className="bg-orange-100 text-orange-800" />
                          <Chip label={achievement.place} size="small" className="bg-purple-100 text-purple-800" />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
