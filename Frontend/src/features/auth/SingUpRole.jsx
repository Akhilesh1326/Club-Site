import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const SignUpRole = () => {
    const [role, setRole] = useState('');
    const [date, setDate] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ role, date, email, password });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='h-screen flex justify-center items-center bg-gradient-to-b from-[#3B82F6] to-[#14B8A6] '>
                <div className='border-2 border-gray-300 p-8 rounded-md bg-white shadow-lg md:w-[40%]'>
                    <h2 className='text-xl font-bold mb-4 text-center text-blue-500 '>Sign Up</h2>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>

                        <TextField
                            id="collegeOrUniversity"
                            label="College Or University"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            id="clubName"
                            label="Club Name"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <InputLabel id="select-small-label">Role</InputLabel>
                        <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            fullWidth
                            required
                            // label="Age"
                            color="secondary"
                        >
                            <MenuItem value="">
                                <em>Role</em>
                            </MenuItem>
                            <MenuItem value="Club Member">Club Member</MenuItem>
                            <MenuItem value="Event Organizer">Event Organizer</MenuItem>
                            <MenuItem value="General Participant">General Participant</MenuItem>
                            <MenuItem value="Club Leader/President">Club Leader/President</MenuItem>
                            <MenuItem value="Ambassador/Promoter">Ambassadors/Promoters</MenuItem>
                            <MenuItem value="Mentor/Advisor">Mentors/Advisors</MenuItem>
                        </Select>






                        <DatePicker
                            label="Select Date Of Birth"
                            value={date}
                            color="secondary"
                            onChange={(newValue) => setDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            // sx={{ backgroundColor: '#3B82F6', '&:hover': { backgroundColor: '#2563EB' } }}
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default SignUpRole;
