import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  AppBar,
  Divider,
  Typography,
  Grid,
  Popover,
  IconButton,
  Avatar,
  Button,
  Link,
  Menu,
  MenuItem,
} from "@material-ui/core";

import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";

import profile from "../dev-imgs/profile.jpg";

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

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
              <Link component={RouterLink} to="/">
                Homie
              </Link>
            </Typography>
            <Typography variant="title">
              <Link component={RouterLink} to="/new">
                New Listing
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <div>
              <IconButton component={RouterLink} to="/chats" aria-label="chats">
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>

              <Typography variant="title">
                <IconButton
                  component={RouterLink}
                  to="/saved"
                  aria-label="saved"
                >
                  <FavoriteBorderRoundedIcon />
                </IconButton>
              </Typography>
              <Typography variant="title">
                <IconButton aria-label="notifications">
                  <NotificationsNoneRoundedIcon />
                </IconButton>
              </Typography>
              <Typography variant="title">
                <IconButton aria-label="profile" onClick={handleClick}>
                  <Avatar alt="Max Tsiang" src={profile} />
                </IconButton>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem component={RouterLink} to="/editprofile">
                    Edit Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Popover>
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
