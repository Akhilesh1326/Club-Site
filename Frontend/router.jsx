import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./src/pages/LandingPage.jsx";
import Register from "./src/features/auth/RegistrationForm.jsx";
import Login from "./src/features/auth/LogIn.jsx"
import HomePage from "./src/pages/HomePage.jsx";

import ClubsPage from "./src/pages/ClubsPage.jsx";
import ExplorePage from "./src/pages/ExplorePage.jsx";
import InternalCommunityPage from "./src/pages/InternalCommunityPage.jsx";
import Dashboard from "./src/features/dashboard/Dashboard.jsx";
import EventRegistrationForm from "./src/pages/EventRegistrationForm.jsx";
import ClubDashboard from './src/features/dashboard/ClubDashboard.jsx'
import Attendance from "./src/pages/Attendance.jsx"



const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <Register/>},
    { path: "/log-in", element: <Login/>},
    { path: "/home", element: <HomePage/>},
    { path: "/explore", element: <ExplorePage/>},
    { path: "/community", element: <InternalCommunityPage/>},
    { path: "/club-page", element: <ClubsPage/>},
    { path: "/dashboard", element: <Dashboard/>},  
    { path: "/event-register", element: <EventRegistrationForm/>},  
    { path: "/club-dashboard", element: <ClubDashboard/>},  
    { path: "/attendance", element: <Attendance/>},  

  ])

export default router;
  