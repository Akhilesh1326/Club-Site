import { TextField, Button } from '@mui/material';
import { use } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function checkDetail(e) {
    e.preventDefault()
    console.log("userName = ", usernameOrEmail); 
    console.log("password = ",password)
  }

  function handleUserNameInput(e){
    setUserNameOrEmail(e.target.value);
  }
  function handlePasswordInput(e){
    setPassword(e.target.value);
  }

  function regEx(usernameOrEmail, password) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    const isValidUsername = usernameRegex.test(usernameOrEmail);
    const isValidEmail = emailRegex.test(usernameOrEmail);
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{2,}$/;
  
    const isValidPassword = passwordRegex.test(password);
  
    // return (isValidUsername || isValidEmail) && isValidPassword;

    if(!isValidEmail || !isValidUsername){
        setError("Invalid Username or Email Formate");
        return false;
    }
    if(!isValidPassword){
      setError("Invalid Password Formate");
      return false;
    }

    return true;

  }
  

  const handleSignInInput = () =>{
    if(regEx(usernameOrEmail,password)){
      setError("Username Or Passwor")
      return;
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
        </form>
      </div>
    </div>
  );
};

export default SignIn;
