"use client"

import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CardActionArea from "@mui/material/CardActionArea"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import Chip from "@mui/material/Chip"

import HomeFooter from "../components/HomeFooter"
import HomeHeader from "../components/HomeHeader"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Define the Club type for better type safety


export default function ExplorePage() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function getClubs() {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/club-management/clubs")
        setClubs(response.data)
      } catch (error) {
        console.log("Error occurred while getting clubs", error)
      } finally {
        setIsLoading(false)
      }
    }

    getClubs()
  }, [])

  // Filter clubs based on search query
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (club.description && club.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HomeHeader />

      {/* Main content with padding-bottom to account for fixed footer */}
      <Box
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
          py: 4,
          pb: { xs: 16, sm: 14 }, // Extra padding at bottom for fixed footer
          maxWidth: "1400px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              background: "linear-gradient(90deg, #3B82F6 0%, #14B8A6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
            }}
          >
            Explore Clubs
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", mb: 3 }}>
            Discover and join clubs that match your interests and passions
          </Typography>

          {/* Search bar */}
          <TextField
            placeholder="Search clubs..."
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(59, 130, 246, 0.4) !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3B82F6 !important",
                },
              },
            }}
            sx={{ maxWidth: "500px", mx: "auto", mb: 4 }}
          />
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#3B82F6" }} />
          </Box>
        ) : filteredClubs.length > 0 ? (
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {filteredClubs.map((club) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={club.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px) scale(1.02)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardActionArea sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                    <CardMedia
                    onClick={()=>navigate('/club-page', {state:{clubId: club.id}})}
                      component="img"
                      sx={{
                        height: 180,
                        objectFit: "cover",
                      }}
                      image={club.image || "/images/default-club.jpg"}
                      alt={club.name}
                    />
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          color: "#3B82F6",
                          fontWeight: 600,
                          mb: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {club.name}
                      </Typography>

                      {club.category && (
                        <Chip
                          label={club.category}
                          size="small"
                          sx={{
                            alignSelf: "flex-start",
                            mb: 1.5,
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            color: "#3B82F6",
                            fontWeight: 500,
                          }}
                        />
                      )}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          flexGrow: 1,
                        }}
                      >
                        {club.description || "No description available."}
                      </Typography>

                      <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#14B8A6",
                            fontWeight: 500,
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          Learn more
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.primary">
              No clubs found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchQuery ? "Try a different search term" : "Clubs will appear here once they are added"}
            </Typography>
          </Box>
        )}
      </Box>

      <HomeFooter />
    </div>
  )
}

