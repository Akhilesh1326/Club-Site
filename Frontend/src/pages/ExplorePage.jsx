"use client"

import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const clubs = [
  {
    id: 1,
    name: "Tech Club",
    description: "Explore the latest in technology",
    image: "/placeholder.svg?height=140&width=345",
  },
  {
    id: 2,
    name: "Art Society",
    description: "Express yourself through various art forms",
    image: "/placeholder.svg?height=140&width=345",
  },
  {
    id: 3,
    name: "Debate Team",
    description: "Sharpen your argumentation skills",
    image: "/placeholder.svg?height=140&width=345",
  },
  {
    id: 4,
    name: "Sports Club",
    description: "Stay active and compete in various sports",
    image: "/placeholder.svg?height=140&width=345",
  },
  {
    id: 5,
    name: "Music Band",
    description: "Create and perform music with fellow enthusiasts",
    image: "/placeholder.svg?height=140&width=345",
  },
  {
    id: 6,
    name: "Chess Club",
    description: "Master the game of kings",
    image: "/placeholder.svg?height=140&width=345",
  },
];

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div role="presentation" onClick={handleClick} className="mb-6">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            ClubConnect
          </Link>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Explore</Typography>
        </Breadcrumbs>
      </div>

      <Typography variant="h4" component="h1" gutterBottom>
        Explore Clubs
      </Typography>

      <Grid container spacing={4}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Card>
              <CardActionArea>
                <CardMedia component="img" height="140" image={club.image} alt={club.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {club.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {club.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}