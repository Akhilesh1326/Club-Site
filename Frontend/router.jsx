import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./src/pages/LandingPage.jsx";
import Register from "./src/features/auth/RegistrationForm.jsx";
import Login from "./src/features/auth/LogIn.jsx"
import HomePage from "./src/pages/HomePage.jsx";

import ClubsPage from "./src/pages/ClubsPage.jsx";
import ExplorePage from "./src/pages/ExplorePage.jsx";
import InternalCommunityPage from "./src/pages/InternalCommunityPage.jsx";
import ClubLeaderDashboard from "./src/features/dashboard/ClubLeaderDashboard.jsx";

import AdminProfile from "./src/components/profile/AdminProfile.jsx";
import ModeratorProfile from "./src/components/profile/ModeratorProfile.jsx";

const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <Register/>},
    { path: "/log-in", element: <Login/>},
    { path: "/home", element: <HomePage/>},
    { path: "/explore", element: <ExplorePage/>},
    { path: "/community", element: <InternalCommunityPage/>},
    { path: "/clubs", element: <ClubsPage/>},
    { path: "/admin", element: <AdminProfile/>},
    { path: "/mod", element: <ModeratorProfile/>},
    { path: "/club-leader-dashboard", element: <ClubLeaderDashboard/>}, 
  ])

export default router;
  