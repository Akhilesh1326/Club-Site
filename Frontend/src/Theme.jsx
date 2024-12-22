// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B82F6", // Vivid Sky Blue
    },
    secondary: {
      main: "#14B8A6", // Teal
    },
    accent: {
      main: "#8B5CF6", // Purple
      contrastText: "#FFFFFF", // White text on buttons or banners
    },
    warning: {
      main: "#F97316", // Orange for CTA
    },
    success: {
      main: "#10B981", // Green for success alerts
    },
    error: {
      main: "#EF4444", // Red for errors or warnings
    },
    background: {
      default: "#F3F4F6", // Light Gray for main backgrounds
      paper: "#FFFFFF", // White for cards or sections
    },
    text: {
      primary: "#111827", // Black for strong contrast
      secondary: "#374151", // Dark Gray for text in dark mode
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Customize font if needed
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#3B82F6", // Blue for headers
    },
    button: {
      textTransform: "none", // Disable uppercase for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners for buttons
        },
        contained: {
          backgroundColor: "#F97316", // Orange CTA
          "&:hover": {
            backgroundColor: "#EA680C", // Slightly darker orange on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F4F6", // Light Gray
          border: `1px solid #14B8A6`, // Teal border for cards
          borderRadius: "12px",
        },
      },
    },
  },
});

export default theme;
