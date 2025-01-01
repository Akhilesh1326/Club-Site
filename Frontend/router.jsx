import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./src/pages/LandingPage.jsx";
import SignUp from './src/features/auth/SignUp.jsx';
import SingUpRole from './src/features/auth/SingUpRole.jsx';
import SignIn from "./src/features/auth/SignIn.jsx";
import HomePage from "./src/pages/HomePage.jsx";

import ClubsPage from "./src/pages/ClubsPage.jsx";
import ExplorePage from "./src/pages/ExplorePage.jsx";
import InternalCommunityPage from "./src/pages/InternalCommunityPage.jsx";

const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/sign-up", element: <SignUp/>},
    { path: "/sign-up-role", element: <SingUpRole/>},
    { path: "/sign-in", element: <SignIn/>},
    { path: "/home", element: <HomePage/>},
    { path: "/explore", element: <ExplorePage/>},
    { path: "/your-community", element: <InternalCommunityPage/>},
    { path: "/clubs", element: <ClubsPage/>},
  ])

export default router;
  