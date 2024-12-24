import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Theme";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage"
import SignUp from './features/auth/SignUp.jsx';
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/sign-up", element: <SignUp/>}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </StrictMode>,
)
