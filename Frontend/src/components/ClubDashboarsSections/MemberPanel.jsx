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
  Avatar,
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
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
} from "@mui/icons-material"

export default function MembersPanel({ clubName = "Chess Club" }) {
  const [members] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@university.edu",
      role: "President",
      joinDate: "2024-09-15",
      status: "Active",
      skillLevel: "Advanced",
    },
    {
      id: 2,
      name: "Emily Wilson",
      email: "e.wilson@university.edu",
      role: "Secretary",
      joinDate: "2024-09-18",
      status: "Active",
      skillLevel: "Intermediate",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@university.edu",
      role: "Treasurer",
      joinDate: "2024-09-20",
      status: "Active",
      skillLevel: "Advanced",
    },
    {
      id: 4,
      name: "Sarah Lee",
      email: "s.lee@university.edu",
      role: "Vice President",
      joinDate: "2024-09-22",
      status: "Active",
      skillLevel: "Advanced",
    },
    {
      id: 5,
      name: "David Kim",
      email: "d.kim@university.edu",
      role: "Member",
      joinDate: "2024-09-25",
      status: "Inactive",
      skillLevel: "Beginner",
    },
    {
      id: 6,
      name: "Jessica Martinez",
      email: "j.martinez@university.edu",
      role: "Member",
      joinDate: "2024-10-05",
      status: "Active",
      skillLevel: "Intermediate",
    },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [filterRole, setFilterRole] = useState("All")

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const filteredMembers = filterRole === "All" ? members : members.filter((member) => member.role === filterRole)

  return (
    <Box>
      <Card className="mb-4">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Search members..."
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
                <InputLabel>Role</InputLabel>
                <Select value={filterRole} label="Role" onChange={(e) => setFilterRole(e.target.value)}>
                  <MenuItem value="All">All Roles</MenuItem>
                  <MenuItem value="President">President</MenuItem>
                  <MenuItem value="Vice President">Vice President</MenuItem>
                  <MenuItem value="Secretary">Secretary</MenuItem>
                  <MenuItem value="Treasurer">Treasurer</MenuItem>
                  <MenuItem value="Member">Member</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} className="flex justify-end">
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenDialog}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add Member
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" component="div" className="mb-4">
            {clubName} Members
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Skill Level</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box className="flex items-center gap-2">
                        <Avatar>{member.name.charAt(0)}</Avatar>
                        <Typography variant="body2">{member.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.skillLevel}
                        size="small"
                        className={
                          member.skillLevel === "Advanced"
                            ? "bg-green-100 text-green-800"
                            : member.skillLevel === "Intermediate"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      />
                    </TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.status}
                        size="small"
                        color={member.status === "Active" ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" className="text-purple-500">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <MailIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <Box component="form" className="space-y-4 mt-2">
            <TextField fullWidth label="Full Name" variant="outlined" required />
            <TextField fullWidth label="Email" type="email" variant="outlined" required />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="Member">
                <MenuItem value="Member">Member</MenuItem>
                <MenuItem value="President">President</MenuItem>
                <MenuItem value="Vice President">Vice President</MenuItem>
                <MenuItem value="Secretary">Secretary</MenuItem>
                <MenuItem value="Treasurer">Treasurer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Skill Level</InputLabel>
              <Select label="Skill Level" defaultValue="Beginner">
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
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
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
