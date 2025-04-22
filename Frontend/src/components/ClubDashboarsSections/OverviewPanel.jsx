"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
} from "@mui/material"
import {
  Event as EventIcon,
  People as PeopleIcon,
  EmojiEvents as TrophyIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material"

export default function OverviewPanel({ clubName = "Chess Club" }) {
  const [upcomingEvents] = useState([
    { id: 1, name: "Weekly Chess Tournament", date: "2025-04-15", location: "Student Center" },
    { id: 2, name: "Beginner's Workshop", date: "2025-04-20", location: "Room 101" },
    { id: 3, name: "Chess Strategy Session", date: "2025-04-25", location: "Conference Hall" },
  ])

  const [recentActivity] = useState([
    { id: 1, action: "New member joined", member: "Alex Johnson", time: "2 hours ago" },
    { id: 2, action: "Tournament results posted", member: "Club Admin", time: "5 hours ago" },
    { id: 3, action: "Meeting minutes uploaded", member: "Emily Wilson", time: "1 day ago" },
    { id: 4, action: "New announcement", member: "Michael Chen", time: "2 days ago" },
  ])

  const [activeMembers] = useState([
    { id: 1, name: "Alex J", avatar: "A" },
    { id: 2, name: "Emily W", avatar: "E" },
    { id: 3, name: "Michael C", avatar: "M" },
    { id: 4, name: "Sarah L", avatar: "S" },
    { id: 5, name: "David K", avatar: "D" },
    { id: 6, name: "Jessica M", avatar: "J" },
  ])

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="flex flex-col items-center">
              <PeopleIcon className="text-orange-500 text-4xl mb-2" />
              <Typography variant="h5" component="div">
                32
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Members
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="flex flex-col items-center">
              <EventIcon className="text-orange-500 text-4xl mb-2" />
              <Typography variant="h5" component="div">
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upcoming Events
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="flex flex-col items-center">
              <TrophyIcon className="text-orange-500 text-4xl mb-2" />
              <Typography variant="h5" component="div">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tournaments Hosted
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent className="flex flex-col items-center">
              <NotificationsIcon className="text-orange-500 text-4xl mb-2" />
              <Typography variant="h5" component="div">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Announcements
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Members */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="div">
                  Active Members
                </Typography>
                <Button variant="contained" size="small" className="bg-orange-500 hover:bg-orange-600 text-white">
                  View All
                </Button>
              </Box>
              <Box className="flex flex-col gap-4">
                <AvatarGroup max={6} className="justify-center">
                  {activeMembers.map((member) => (
                    <Avatar key={member.id}>{member.avatar}</Avatar>
                  ))}
                </AvatarGroup>
                <Box className="flex justify-center gap-2 mt-2">
                  <Button variant="contained" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Add Member
                  </Button>
                  <Button variant="outlined" className="border-purple-500 text-purple-500 hover:bg-purple-50">
                    Message All
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="div">
                  Upcoming Events
                </Typography>
                <Button variant="contained" size="small" className="bg-orange-500 hover:bg-orange-600 text-white">
                  View All
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" component="div">
                  Recent Activity
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  className="border-purple-500 text-purple-500 hover:bg-purple-50"
                >
                  View All
                </Button>
              </Box>
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>Member</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.member}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" className="mb-4">
                Quick Actions
              </Typography>
              <Box className="flex flex-wrap gap-2">
                <Button variant="contained" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Schedule Event
                </Button>
                <Button variant="contained" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Post Announcement
                </Button>
                <Button variant="outlined" className="border-purple-500 text-purple-500 hover:bg-purple-50">
                  Upload Resources
                </Button>
                <Button variant="outlined" className="border-purple-500 text-purple-500 hover:bg-purple-50">
                  Generate Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
