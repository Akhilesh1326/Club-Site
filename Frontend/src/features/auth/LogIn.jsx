import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleUserNameInput(e) {
    setUserNameOrEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function regEx(usernameOrEmail, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{2,}$/;

    const isValidUsername = usernameRegex.test(usernameOrEmail);
    const isValidEmail = emailRegex.test(usernameOrEmail);
    const isValidPassword = passwordRegex.test(password);

    if (!(isValidEmail || isValidUsername)) {
      setError("Invalid Username or Email Format");
      return false;
    }
    if (isValidPassword) {
      setError(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return false;
    }
    return true;
  }

  async function handleSignInInput(e) {
    e.preventDefault();

    if (!regEx(usernameOrEmail, password)) {
      return;
    }

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      usernameOrEmail
    );

    try {
      let response;
      if (isEmail) {
        // API call for email login
        // response = await axios.post("https://api.example.com/login/", {
        //   email: usernameOrEmail,
        //   password,
        // });
        console.log("email api call made");
      } else {
        // API call for username login
        response = await axios.post("/api/auth-service/login", {
          userName: usernameOrEmail,
          password,
        });
      }

      // Handle successful login
      console.log("Login Successful:", response.data);
      if (response.data.includes("Success")) {
        navigate("/home")
      }
      else {
        setError("Invalid LogIn");
      }
      setError("");
    } catch (err) {
      // Handle API error
      console.error("Login Failed:", err.response?.data || err.message);
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-b from-[#8B5CF6]  to-[#14B8A6]'>
      <div className='border-2 border-gray-300 p-8 rounded-md bg-white shadow-lg md:w-[40%]'>
        <h2 className='text-xl font-bold mb-4 text-center text-blue-500 '>Sign In</h2>
        <form className='flex flex-col space-y-4'>

          <div>
            {error}
          </div>
          {/* Username */}
          <TextField
            id="usernameOrEmail"
            label="Username\Email"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            onChange={handleUserNameInput}
            value={usernameOrEmail}

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
            onChange={handlePasswordInput}
            value={password}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSignInInput}

          >
            Sign Up
          </Button>

          <div className="flex flex-row self-center text-sm sm:text-base md:text-md lg:text-lg xl:text-2xl">
            New here, please
            <div className="flex flex-row mx-1 text-blue-500 hover:underline cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" onClick={()=>navigate("/register")}>
              Register
            </div>
            here
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
