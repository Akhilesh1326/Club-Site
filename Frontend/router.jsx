import { createBrowserRouter } from "react-router-dom";

// import LandingPage from "./src/pages/LandingPage.jsx";
import LandingPage from "./src/pages/LandingPage.jsx";
import SignUp from './src/features/auth/SignUp.jsx';
import SingUpRole from './src/features/auth/SingUpRole.jsx';
const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/sign-up", element: <SignUp/>},
    { path: "/sign-up-role", element: <SingUpRole/>},
  ])

export default router;
  