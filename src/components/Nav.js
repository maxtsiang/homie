import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Divider,
  Typography,
  Grid,
  Button,
  IconButton,
  Avatar,
} from "@material-ui/core";

import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";

import profile from "../dev-imgs/profile.jpg";

function Nav() {
  return (
    <div style={{ marginBottom: "3em" }}>
      <AppBar
        style={{
          background: "#FFFFFF",
          overflow: "hidden",
          paddingLeft: "3em",
          paddingRight: "3em",
          boxShadow: "none",
        }}
      >
        <Grid
          container
          display="flex"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography variant="title">
              <Button component={Link} to="/">
                Homie
              </Button>
            </Typography>
            <Typography variant="title">
              <Button component={Link} to="/new">
                New Listing
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <div>
              <Typography variant="title">
                <IconButton component={Link} to="/chats" aria-label="chats">
                  <ChatBubbleOutlineRoundedIcon />
                </IconButton>
              </Typography>
              <Typography variant="title">
                <IconButton component={Link} to="/saved" aria-label="saved">
                  <FavoriteBorderRoundedIcon />
                </IconButton>
              </Typography>
              <Typography variant="title">
                <IconButton
                  component={Link}
                  to="/notifications"
                  aria-label="notifications"
                >
                  <NotificationsNoneRoundedIcon />
                </IconButton>
              </Typography>
              <Typography variant="title">
                <IconButton component={Link} to="/profile" aria-label="profile">
                  <Avatar alt="Max Tsiang" src={profile} />
                </IconButton>
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Divider />
      </AppBar>
    </div>
  );
}

export default Nav;
