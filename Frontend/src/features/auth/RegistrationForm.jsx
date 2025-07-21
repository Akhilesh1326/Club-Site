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
  Alert,
} from "@mui/material"
import { Visibility, VisibilityOff, CloudUpload } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"

function RegistrationForm() {
  const navigate = useNavigate()
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
    state: "",
    city: "",
    department: "",
    year: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      DOB: date,
    })
    if (error) setError("")
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum size is 5MB.");
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.");
        return;
      }
      
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setFormData((prev) => ({
        ...prev,
        profile_picture_file: file,
      }));
      
      if (error) setError("");
    }
  }

  const validateForm = () => {
    // Basic validation
    if (!formData.userName.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.DOB) {
      setError("Date of birth is required");
      return false;
    }
    if (!formData.collegeOrUniversityName.trim()) {
      setError("College/University name is required");
      return false;
    }
    if (!formData.role) {
      setError("Role is required");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation (minimum 6 characters)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formattedDOB = formData.DOB ? dayjs(formData.DOB).format("DD-MM-YYYY") : "";
      
      const form = new FormData();
      form.append("userName", formData.userName.trim());
      form.append("email", formData.email.trim());
      form.append("password", formData.password);
      form.append("firstName", formData.firstName.trim());
      form.append("lastName", formData.lastName.trim());
      form.append("DOB", formattedDOB);
      form.append("collegeOrUniversityName", formData.collegeOrUniversityName.trim());
      form.append("role", formData.role);
      form.append("phoneNumber", formData.phoneNumber.trim());
      form.append("state", formData.state.trim());
      form.append("city", formData.city.trim());
      form.append("department", formData.department.trim());
      form.append("year", formData.year);
      
      if (formData.profile_picture_file) {
        form.append("profile_picture", formData.profile_picture_file);
      }

      const response = await axios.post("/api/auth-service/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Registration response:", response.data);
      
      if (response.data.status === "Success" || response.data.status === "success") {
        navigate("/home");
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                helperText="Minimum 6 characters"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={() => setShowPassword(!showPassword)} 
                        edge="end"
                        disabled={loading}
                      >
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
                  maxDate={dayjs().subtract(13, 'year')} // Minimum age 13
                  disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                helperText="10-digit phone number"
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
                  disabled={loading}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.replace("_", " ")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                variant="outlined"
                disabled={loading}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                variant="outlined"
                disabled={loading}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                variant="outlined"
                disabled={loading}
              />
            </Grid>

            {/* Year (Integer) */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year Of Degree"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                variant="outlined"
                disabled={loading}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 1, max: 8 }}
                helperText="Enter your current year of study"
              />
            </Grid>

            {/* Profile Picture */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Profile Picture (Optional)
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
                  <Button 
                    variant="outlined" 
                    component="label" 
                    startIcon={<CloudUpload />} 
                    sx={{ mb: 1 }} 
                    fullWidth
                    disabled={loading}
                  >
                    Upload Image
                    <input 
                      type="file" 
                      hidden 
                      accept="image/jpeg,image/png,image/gif,image/webp" 
                      onChange={handleFileChange} 
                    />
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Max 5MB. JPEG, PNG, GIF, or WebP format.
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
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: "linear-gradient(to right, #3B82F6, #14B8A6)",
                  "&:hover": {
                    background: "linear-gradient(to right, #2563EB, #0D9488)",
                  },
                  "&:disabled": {
                    background: "#cccccc",
                  },
                }}
              >
                {loading ? "Creating Account..." : "Register Account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default RegistrationForm