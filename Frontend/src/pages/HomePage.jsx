import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-gray-900 flex flex-col justify-center items-center h-screen text-white'>
      <div className='text-xl'>Home Page</div>
      <div className='m-2' onClick={()=>{navigate("/explore")}}>Explore</div>
      <div className='m-2' onClick={()=>{navigate("/clubs")}}>Clubs</div>
      <div className='m-2' onClick={()=>{navigate("/your-community")}}>Internal Community</div>
    </div>
  )
}

export default HomePage
