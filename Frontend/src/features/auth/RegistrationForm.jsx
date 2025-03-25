"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Box,
  Avatar,
} from "@mui/material"
import { Visibility, VisibilityOff, CloudUpload, Air } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    DOB: null,
    collegeOrUniversityName: "",
    role: "",
    phoneNumber: "",
    profile_picture_url: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      DOB: date,
    })
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Create a temporary URL for preview
      const fileUrl = URL.createObjectURL(file)
      setPreviewImage(fileUrl)
      setFormData({
        ...formData,
        profile_picture_url: fileUrl,
      })
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formattedData = {
      ...formData,
      DOB: formData.DOB ? dayjs(formData.DOB).format("DD-MM-YYYY") : "",
    }
    console.log("Form submitted:", formattedData)

    try {
      const response = await axios.post("/api/auth-service/register",{
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        DOB: formattedData.DOB,
        collegeOrUniversityName: formData.collegeOrUniversityName,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        profile_picture_url: formData.profile_picture_url,
      },
    {
      withCredentials: true,
    });

      console.log("resp data = ",response.data);
      if(response.data.status === "success"){
        navigate("/home")
      }

    } catch (error) {
      console.log("Registration failed = ", error.response?.data || error);
    }
  }

  const roles = ["Fresher", "Club_Member", "Club_President", "General_Participant", "Event_Organizer"]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #3B82F6, #14B8A6)",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          border: "2px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" color="#3B82F6" gutterBottom fontWeight="bold">
          Create Account
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" paragraph>
          Fill in your details to register a new account.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Name & Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Username & Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.DOB}
                  onChange={handleDateChange}
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: { fullWidth: true, required: true },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* College/University Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="College/University Name"
                name="collegeOrUniversityName"
                value={formData.collegeOrUniversityName}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={handleInputChange}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.replace("_", " ")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Profile Picture */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Profile Picture
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{
                      border: "2px dashed #e0e0e0",
                      borderRadius: 2,
                      p: 2,
                      height: 150,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {previewImage ? (
                      <Avatar
                        src={previewImage}
                        alt="Profile preview"
                        sx={{ width: 120, height: 120 }}
                        variant="rounded"
                      />
                    ) : (
                      <Box sx={{ textAlign: "center" }}>
                        <CloudUpload sx={{ fontSize: 40, color: "#bdbdbd" }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Upload an image
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" component="label" startIcon={<CloudUpload />} sx={{ mb: 1 }} fullWidth>
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Recommended: Square image, JPG or PNG format
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: "linear-gradient(to right, #3B82F6, #14B8A6)",
                  "&:hover": {
                    background: "linear-gradient(to right, #2563EB, #0D9488)",
                  },
                }}
              >
                Register Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default RegistrationForm