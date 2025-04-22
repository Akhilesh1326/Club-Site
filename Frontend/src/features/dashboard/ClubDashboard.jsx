"use client"

import { useState } from "react"
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import OverviewPanel from "../../components/ClubDashboarsSections/OverviewPanel"
import ClubInfoPanel from "../../components/ClubDashboarsSections/ClubInfoPanel"
import EventsPanel from "../../components/ClubDashboarsSections/EventPanel"
import MembersPanel from "../../components/ClubDashboarsSections/MemberPanel"
import SettingsPanel from "../../components/ClubDashboarsSections/SettingPanel"

const drawerWidth = 240

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePanel, setActivePanel] = useState("Overview")
  const clubName = "Chess Club"

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const renderPanel = () => {
    switch (activePanel) {
      case "Overview":
        return <OverviewPanel clubName={clubName} />
      case "Club Info":
        return <ClubInfoPanel clubName={clubName} />
      case "Events":
        return <EventsPanel clubName={clubName} />
      case "Members":
        return <MembersPanel clubName={clubName} />
      case "Settings":
        return <SettingsPanel clubName={clubName} />
      default:
        return <OverviewPanel clubName={clubName} />
    }
  }

  const drawer = (
    <div>
      <Toolbar className="bg-gradient-to-r from-blue-500 to-teal-500">
        <Typography variant="h6" noWrap component="div" className="text-white">
          {clubName}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Overview", "Club Info", "Events", "Members", "Settings"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => setActivePanel(text)}
              selected={activePanel === text}
              className={activePanel === text ? "bg-orange-50" : ""}
            >
              <ListItemIcon>
                {text === "Overview" && <DashboardIcon className={activePanel === text ? "text-orange-500" : ""} />}
                {text === "Club Info" && <InfoIcon className={activePanel === text ? "text-orange-500" : ""} />}
                {text === "Events" && <EventIcon className={activePanel === text ? "text-orange-500" : ""} />}
                {text === "Members" && <PeopleIcon className={activePanel === text ? "text-orange-500" : ""} />}
                {text === "Settings" && <SettingsIcon className={activePanel === text ? "text-orange-500" : ""} />}
              </ListItemIcon>
              <ListItemText primary={text} className={activePanel === text ? "text-orange-500" : ""} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="bg-gradient-to-r from-blue-500 to-teal-500"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {clubName} - {activePanel}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {renderPanel()}
      </Box>
    </Box>
  )
}
