import { TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';



const SingUpRole = () => {
    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-b from-[#3B82F6] to-[#14B8A6]'>
            <div className='border-2 border-gray-300 p-8 rounded-md bg-white shadow-lg'>
                <h2 className='text-xl font-bold mb-4 text-center text-blue-500 '>Sign Up</h2>
                <form className='flex flex-col space-y-4'>
                    {/* Full Name */}
                    <InputLabel id="demo-select-small-label">Age</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={role}
                        label="Role"
                        onChange={}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Club Member"}>Club Member</MenuItem>
                        <MenuItem value={"Event Organizer"}>Event Organizer</MenuItem>
                        <MenuItem value={"General Participant"}>General Participant</MenuItem>
                        <MenuItem value={"Club Leader/President"}>Club Leader/President</MenuItem>
                        <MenuItem value={"Ambassador/Promoter"}>Ambassadors/Promoters</MenuItem>
                        <MenuItem value={"Mentor/Advisor"}>Mentors/Advisors</MenuItem>

                    </Select>

                    {/* Username */}
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                    />

                    {/* Email */}
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                    />

                    {/* Password */}
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SingUpRole
