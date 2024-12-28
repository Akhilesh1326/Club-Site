import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";


import { RouterProvider } from "react-router-dom";
import router from "../router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <div>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </StrictMode>,
)
