import { TextField, Button } from '@mui/material';

const SignIn = () => {
  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-b from-[#8B5CF6]  to-[#14B8A6]'>
      <div className='border-2 border-gray-300 p-8 rounded-md bg-white shadow-lg md:w-[40%]'>
        <h2 className='text-xl font-bold mb-4 text-center text-blue-500 '>Sign In</h2>
        <form className='flex flex-col space-y-4'>
          {/* Full Name */}
          <TextField
            id="full-name"
            label="Full Name"
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />

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
  );
};

export default SignIn;
