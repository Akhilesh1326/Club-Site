

import  React from "react"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import HomeHeader from "../components/HomeHeader"
import HomeFooter from "../components/HomeFooter"

// Material UI imports
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Avatar from "@mui/material/Avatar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import CircularProgress from "@mui/material/CircularProgress"
import IconButton from "@mui/material/IconButton"

// Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PeopleIcon from "@mui/icons-material/People"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import InfoIcon from "@mui/icons-material/Info"
import ShareIcon from "@mui/icons-material/Share"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"


// Mock data (replace with actual API call)
const mockEvents = [
  {
    id: "e1",
    title: "Annual Hackathon 2023",
    date: "2023-11-15",
    time: "9:00 AM - 9:00 PM",
    location: "Main Campus, Building A",
    description: "A 12-hour coding competition where teams build innovative solutions to real-world problems.",
    image: "/images/event1.jpg",
    isUpcoming: true,
  },
  {
    id: "e2",
    title: "Workshop: Intro to AI",
    date: "2023-10-25",
    time: "3:00 PM - 5:00 PM",
    location: "Tech Lab, Building B",
    description: "Learn the basics of artificial intelligence and machine learning in this hands-on workshop.",
    image: "/images/event2.jpg",
    isUpcoming: true,
  },
  {
    id: "e3",
    title: "Tech Talk: Future of Web Development",
    date: "2023-09-10",
    time: "4:00 PM - 6:00 PM",
    location: "Auditorium C",
    description: "Industry experts discuss the latest trends and future of web development.",
    image: "/images/event3.jpg",
    isUpcoming: false,
  },
  {
    id: "e4",
    title: "Coding Bootcamp",
    date: "2023-08-05",
    time: "10:00 AM - 4:00 PM",
    location: "Computer Lab",
    description: "Intensive coding session for beginners to learn programming fundamentals.",
    image: "/images/event4.jpg",
    isUpcoming: false,
  },
]


const mockAchievements = [
  {
    id: "a1",
    title: "First Place - National Collegiate Hackathon",
    date: "2023-05-20",
    description: "Our team won first place for developing an innovative solution for sustainable urban mobility.",
    image: "/images/achievement1.jpg",
  },
  {
    id: "a2",
    title: "Best Tech Club Award",
    date: "2022-12-15",
    description: "Recognized as the best technology club among all colleges in the region.",
    image: "/images/achievement2.jpg",
  },
  {
    id: "a3",
    title: "Innovation Grant Recipient",
    date: "2022-09-30",
    description: "Received a $10,000 grant to develop technology solutions for local community challenges.",
    image: "/images/achievement3.jpg",
  },
]

const mockClubData = {
  id: "1",
  name: "Tech Innovators Club",
  description:
    "A community of tech enthusiasts dedicated to innovation and learning. We organize workshops, hackathons, and tech talks to foster a culture of technological advancement and collaboration among students.",
  bannerImage: "/images/club-banner.jpg",
  logoImage: "/images/club-logo.jpg",
  category: "Technology",
  foundedYear: null,
  socialLinks: {
    instagram: "https://instagram.com/techinnovators",
    twitter: "https://twitter.com/techinnovators",
    website: "https://techinnovators.edu",
  }
}

export default function ClubPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clubId } = useParams()
  const {clubInfo} = useParams();
  const [club, setClub] = useState(null)
  const [event, setEvents] = useState(null)
  const [members, setMembers] = useState(null)
  const [achievements, setAchievements] = useState(null)
  const [membersCount, setMembersCount] = useState(0)

  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  
  useEffect(() => {
    async function fetchMembers() {
      setLoading(true)
      try {
        const clubId = location.state?.clubId;
        const response = await axios.get(`/api/club-management/club-members/${clubId}`);

          setMembers(response.data.MemberDetails)
          setMembersCount(response.data.MemberDetails.length)
      } catch (error) {
        console.error("Error fetching club data:", error)
        setLoading(false)
      }
    }

    async function fetchAchievements() {
      setLoading(true)
      try {
        // Replace with actual API call
        const clubId = location.state?.clubId;
        console.log("club info = ",location.state?.clubInfo);
        console.log(clubId);
        // const response = await axios.get(`/api/club-management/club-members/${clubId}`);
        // console.log(response.data);
        // setClub(response.data);

          setAchievements(mockAchievements)
      } catch (error) {
        console.error("Error fetching club data:", error)
        setLoading(false)
      }
    }

    async function fetchClub() {
      setLoading(true)
      try {
        // Using mock data for now
        setTimeout(() => {
          setClub(location.state?.clubInfo)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching club data:", error)
        setLoading(false)
      }
    }

    function fetchEvent() {
      setLoading(true)
      try {
          setLoading(false)
          setEvents(mockEvents)
      } catch (error) {
        console.error("Error fetching club data: ", error)
        setLoading(false)
      }
    }

    
    fetchEvent()
    fetchMembers()
    fetchClub()
    fetchAchievements()
  }, [clubId])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <HomeHeader />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", pb: 10 }}>
          <CircularProgress sx={{ color: "#3B82F6" }} />
        </Box>
        <HomeFooter />
      </div>
    )
  }

  if (!club) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <HomeHeader />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", pb: 10 }}>
          <Typography variant="h5" color="text.secondary">
            Club not found
          </Typography>
        </Box>
        <HomeFooter />
      </div>
    )
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HomeHeader />

      <Box sx={{ flexGrow: 1, pb: { xs: 16, sm: 14 } }}>
        {/* Banner and Logo Section */}
        <Box sx={{ position: "relative", height: { xs: "180px", sm: "220px", md: "280px" } }}>
          <Box
            component="img"
            src={club.bannerImage || "/images/default-banner.jpg"}
            alt={`${club.name} banner`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
            }}
          />
        </Box>

        {/* Club Info Section */}
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 10 }, maxWidth: "1400px", mx: "auto", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mt: { xs: -6, sm: -8 } }}>
            {/* Logo and Basic Info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                mb: 3,
                width: "100%",
              }}
            >
              <Avatar
                src={club.logoImage || "/images/default-logo.jpg"}
                alt={`${club.name} logo`}
                sx={{
                  width: { xs: 100, sm: 120, md: 140 },
                  height: { xs: 100, sm: 120, md: 140 },
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  mb: { xs: 2, sm: 0 },
                  mr: { sm: 3 },
                }}
              />

              <Box sx={{ textAlign: { xs: "center", sm: "left" }, flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(90deg, #3B82F6 0%, #14B8A6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                      }}
                    >
                      {club.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 2,
                        justifyContent: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      <Chip
                        label={club.category}
                        size="small"
                        sx={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" }}
                      />
                      <Chip
                        icon={<PeopleIcon fontSize="small" />}
                        label={`${membersCount} Members`}
                        size="small"
                        sx={{ backgroundColor: "rgba(20, 184, 166, 0.1)", color: "#14B8A6" }}
                      />
                      <Chip
                        label={`Est. ${club.foundedYear}`}
                        size="small"
                        sx={{ backgroundColor: "rgba(249, 115, 22, 0.1)", color: "#F97316" }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: { xs: 2, sm: 0 } }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(90deg, #3B82F6 0%, #14B8A6 100%)",
                        textTransform: "none",
                        "&:hover": {
                          background: "linear-gradient(90deg, #2563EB 0%, #0D9488 100%)",
                        },
                      }}
                    >
                      Join Club
                    </Button>
                    <IconButton aria-label="share" sx={{ color: "#3B82F6" }}>
                      <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="bookmark" sx={{ color: "#14B8A6" }}>
                      <BookmarkBorderIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                  {club.description}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tabs Navigation */}
          <Box sx={{ width: "100%", mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  minWidth: "auto",
                  px: 3,
                },
                "& .Mui-selected": {
                  color: "#3B82F6",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#3B82F6",
                },
              }}
            >
              <Tab icon={<InfoIcon />} iconPosition="start" label="About" />
              <Tab icon={<PeopleIcon />} iconPosition="start" label="Members" />
              <Tab icon={<CalendarTodayIcon />} iconPosition="start" label="Events" />
              <Tab icon={<EmojiEventsIcon />} iconPosition="start" label="Achievements" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ mb: 4 }}>
            {/* About Tab */}
            {activeTab === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ mb: 4, borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#3B82F6" }}>
                        About the Club
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {club.description}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Founded in {club.foundedYear}, the {club.name} has grown to become one of the most active clubs
                        on campus with {membersCount} members. We are dedicated to fostering a community of
                        like-minded individuals who are passionate about {club.category.toLowerCase()}.
                      </Typography>
                      <Typography variant="body1">
                        Our club organizes various events throughout the academic year, including workshops,
                        competitions, guest lectures, and social gatherings. We welcome students from all departments
                        and years to join us in our journey of learning and growth.
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#14B8A6" }}>
                        Upcoming Events
                      </Typography>
                      {event.filter((event) => event.isUpcoming).length > 0 ? (
                        <List sx={{ p: 0 }}>
                          {event
                            .filter((event) => event.isUpcoming)
                            .slice(0, 2)
                            .map((event) => (
                              <ListItem key={event.id} alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                                <ListItemAvatar sx={{ mr: 2 }}>
                                  <Avatar
                                    variant="rounded"
                                    src={event.image || "/images/default-event.jpg"}
                                    sx={{ width: 80, height: 80 }}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                      {event.title}
                                    </Typography>
                                  }
                                  secondary={
                                    <Box sx={{ mt: 1 }}>
                                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "#3B82F6" }} />
                                        <Typography variant="body2" color="text.secondary">
                                          {formatDate(event.date)}
                                        </Typography>
                                      </Box>
                                      {event.time && (
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "#14B8A6" }} />
                                          <Typography variant="body2" color="text.secondary">
                                            {event.time}
                                          </Typography>
                                        </Box>
                                      )}
                                      {event.location && (
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                          <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "#F97316" }} />
                                          <Typography variant="body2" color="text.secondary">
                                            {event.location}
                                          </Typography>
                                        </Box>
                                      )}
                                    </Box>
                                  }
                                />
                              </ListItem>
                            ))}
                        </List>
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          No upcoming events at the moment. Check back soon!
                        </Typography>
                      )}
                      {event.filter((event) => event.isUpcoming).length > 2 && (
                        <Button
                          sx={{
                            mt: 2,
                            color: "#14B8A6",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "rgba(20, 184, 166, 0.1)",
                            },
                          }}
                          onClick={() => setActiveTab(2)}
                        >
                          View all events
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card sx={{ mb: 4, borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#F97316" }}>
                        Leadership Team
                      </Typography>
                      <List sx={{ p: 0 }}>
                        {members
                          .filter((member) =>
                            ["President", "Vice President", "Secretary", "Treasurer"].includes(member.role),
                          )
                          .map((member) => (
                            <ListItem key={member.id} sx={{ px: 0, py: 1.5 }}>
                              <ListItemAvatar>
                                <Avatar src={null} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${member.firstName} ${member.lastName}`}
                                secondary={
                                  <Typography variant="body2" color="text.secondary">
                                    {member.role} • {member.department}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                      </List>
                    </CardContent>
                  </Card>

                  <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#8B5CF6" }}>
                        Recent Achievements
                      </Typography>
                      {achievements.length > 0 ? (
                        <List sx={{ p: 0 }}>
                          {achievements.slice(0, 2).map((achievement) => (
                            <ListItem key={achievement.id} alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                              <ListItemAvatar>
                                <Avatar sx={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}>
                                  <EmojiEventsIcon sx={{ color: "#8B5CF6" }} />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {achievement.title}
                                  </Typography>
                                }
                                secondary={
                                  <>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                      {formatDate(achievement.date)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {achievement.description}
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          No achievements recorded yet.
                        </Typography>
                      )}
                      {achievements.length > 2 && (
                        <Button
                          sx={{
                            mt: 2,
                            color: "#8B5CF6",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "rgba(139, 92, 246, 0.1)",
                            },
                          }}
                          onClick={() => setActiveTab(3)}
                        >
                          View all achievements
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* Members Tab */}
            {activeTab === 1 && (
              <Box>
                <Card sx={{ mb: 4, borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#3B82F6" }}>
                        Leadership Team
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      {members
                        .filter((member) =>
                          ["President", "Vice President", "Secretary", "Treasurer"].includes(member.role),
                        )
                        .map((member) => (
                          <Grid item xs={12} sm={6} md={3} key={member.id}>
                            <Card
                              sx={{
                                textAlign: "center",
                                p: 2,
                                height: "100%",
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                  transform: "translateY(-5px)",
                                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                },
                              }}
                            >
                              <Avatar
                                src={null}
                                sx={{
                                  width: 100,
                                  height: 100,
                                  mx: "auto",
                                  mb: 2,
                                  border: "3px solid",
                                  borderColor:
                                    member.role === "President"
                                      ? "#3B82F6"
                                      : member.role === "Vice President"
                                        ? "#14B8A6"
                                        : member.role === "Secretary"
                                          ? "#F97316"
                                          : "#8B5CF6",
                                }}
                              />
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {`${member.firstName} ${member.lastName}`}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  color:
                                    member.role === "President"
                                      ? "#3B82F6"
                                      : member.role === "Vice President"
                                        ? "#14B8A6"
                                        : member.role === "Secretary"
                                          ? "#F97316"
                                          : "#8B5CF6",
                                  mb: 1,
                                }}
                              >
                                {member.role}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {member.department}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {member.year} Year
                              </Typography>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#14B8A6" }}>
                        All Members
                      </Typography>
                      <Chip
                        label={`${membersCount} Total`}
                        size="small"
                        sx={{ backgroundColor: "rgba(20, 184, 166, 0.1)", color: "#14B8A6" }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      {members
                        .filter(
                          (member) => !["President", "Vice President", "Secretary", "Treasurer"].includes(member.role),
                        )
                        .map((member) => (
                          <Grid item xs={12} sm={6} md={4} key={member.id}>
                            <Card
                              sx={{
                                p: 2,
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar src={null} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {`${member.firstName} ${member.lastName}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {member.role} • {member.year} Year
                                </Typography>
                              </Box>
                            </Card>
                          </Grid>
                        ))}

                      {/* Show more members button */}
                      <Grid item xs={12}>
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                          <Button
                            variant="outlined"
                            sx={{
                              borderColor: "#14B8A6",
                              color: "#14B8A6",
                              textTransform: "none",
                              "&:hover": {
                                borderColor: "#0D9488",
                                backgroundColor: "rgba(20, 184, 166, 0.1)",
                              },
                            }}
                          >
                            View All Members
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Events Tab */}
            {activeTab === 2 && (
              <Box>
                <Card sx={{ mb: 4, borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#3B82F6" }}>
                      Upcoming Events
                    </Typography>

                    {event.filter((event) => event.isUpcoming).length > 0 ? (
                      <Grid container spacing={3}>
                        {event
                          .filter((event) => event.isUpcoming)
                          .map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event.id}>
                              <Card
                                sx={{
                                  height: "100%",
                                  borderRadius: "12px",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                  overflow: "hidden",
                                  transition: "transform 0.3s, box-shadow 0.3s",
                                  "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                  },
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={event.image || "/images/default-event.jpg"}
                                  alt={event.title}
                                />
                                <CardContent>
                                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                    {event.title}
                                  </Typography>

                                  <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                      <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "#3B82F6" }} />
                                      <Typography variant="body2" color="text.secondary">
                                        {formatDate(event.date)}
                                      </Typography>
                                    </Box>
                                    {event.time && (
                                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                        <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "#14B8A6" }} />
                                        <Typography variant="body2" color="text.secondary">
                                          {event.time}
                                        </Typography>
                                      </Box>
                                    )}
                                    {event.location && (
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "#F97316" }} />
                                        <Typography variant="body2" color="text.secondary">
                                          {event.location}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>

                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {event.description}
                                  </Typography>

                                  <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                      borderColor: "#3B82F6",
                                      color: "#3B82F6",
                                      textTransform: "none",
                                      "&:hover": {
                                        borderColor: "#2563EB",
                                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                                      },
                                    }}
                                  >
                                    Register Now
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                      </Grid>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        No upcoming events at the moment. Check back soon!
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#14B8A6" }}>
                      Past Events
                    </Typography>

                    {event.filter((event) => !event.isUpcoming).length > 0 ? (
                      <Grid container spacing={3}>
                        {event
                          .filter((event) => !event.isUpcoming)
                          .map((event) => (
                            <Grid item xs={12} sm={6} key={event.id}>
                              <Card
                                sx={{
                                  display: "flex",
                                  height: "100%",
                                  borderRadius: "12px",
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                  overflow: "hidden",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  sx={{ width: 120 }}
                                  image={event.image || "/images/default-event.jpg"}
                                  alt={event.title}
                                />
                                <CardContent sx={{ flex: "1 0 auto", p: 2 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    {event.title}
                                  </Typography>

                                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                    <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "#14B8A6" }} />
                                    <Typography variant="body2" color="text.secondary">
                                      {formatDate(event.date)}
                                    </Typography>
                                  </Box>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {event.description}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                      </Grid>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        No past events to display.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Achievements Tab */}
            {activeTab === 3 && (
              <Box>
                <Card sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#8B5CF6" }}>
                      Club Achievements
                    </Typography>

                    {achievements.length > 0 ? (
                      <Grid container spacing={3}>
                        {achievements.map((achievement) => (
                          <Grid item xs={12} key={achievement.id}>
                            <Card
                              sx={{
                                p: 3,
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                borderLeft: "4px solid #8B5CF6",
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                <Avatar sx={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}>
                                  <EmojiEventsIcon sx={{ color: "#8B5CF6" }} />
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "flex-start",
                                      mb: 1,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                      {achievement.title}
                                    </Typography>
                                    <Chip
                                      label={formatDate(achievement.date)}
                                      size="small"
                                      sx={{ backgroundColor: "rgba(139, 92, 246, 0.1)", color: "#8B5CF6" }}
                                    />
                                  </Box>
                                  <Typography variant="body1">{achievement.description}</Typography>
                                  {achievement.image && (
                                    <Box sx={{ mt: 2 }}>
                                      <img
                                        src={achievement.image || "/placeholder.svg"}
                                        alt={achievement.title}
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "200px",
                                          borderRadius: "8px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        No achievements recorded yet.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <HomeFooter />
    </div>
  )
}

