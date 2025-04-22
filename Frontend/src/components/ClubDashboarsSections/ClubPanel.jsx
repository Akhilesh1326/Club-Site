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
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"

export default function ClubsPanel() {
  const [clubs] = useState([
    { id: 1, name: "Chess Club", category: "Academic", members: 32, status: "Active" },
    { id: 2, name: "Debate Society", category: "Academic", members: 45, status: "Active" },
    { id: 3, name: "Photography Club", category: "Arts", members: 28, status: "Active" },
    { id: 4, name: "Basketball Club", category: "Sports", members: 20, status: "Inactive" },
    { id: 5, name: "Coding Club", category: "Academic", members: 38, status: "Active" },
    { id: 6, name: "Dance Club", category: "Arts", members: 52, status: "Active" },
    { id: 7, name: "Environmental Club", category: "Service", members: 15, status: "Inactive" },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [filterCategory, setFilterCategory] = useState("All")

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const filteredClubs = filterCategory === "All" ? clubs : clubs.filter((club) => club.category === filterCategory)

  return (
    <Box>
      <Card className="mb-4">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search clubs..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select value={filterCategory} label="Category" onChange={(e) => setFilterCategory(e.target.value)}>
                  <MenuItem value="All">All Categories</MenuItem>
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Arts">Arts</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} className="flex justify-end">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add New Club
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" component="div" className="mb-4">
            Club Directory
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Club Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Members</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell>{club.name}</TableCell>
                    <TableCell>{club.category}</TableCell>
                    <TableCell>{club.members}</TableCell>
                    <TableCell>
                      <Chip label={club.status} size="small" color={club.status === "Active" ? "success" : "default"} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" className="text-purple-500">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Club Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Club</DialogTitle>
        <DialogContent>
          <Box component="form" className="space-y-4 mt-2">
            <TextField fullWidth label="Club Name" variant="outlined" required />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" defaultValue="">
                <MenuItem value="Academic">Academic</MenuItem>
                <MenuItem value="Arts">Arts</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Description" variant="outlined" multiline rows={4} />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue="Active">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="border-purple-500 text-purple-500 hover:bg-purple-50">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} className="bg-orange-500 hover:bg-orange-600 text-white">
            Create Club
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
