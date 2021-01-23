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
  MenuItem,
  makeStyles,
  Box,
} from "@material-ui/core";

import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

const useStyles = makeStyles({
  navText: {
    color: "black",
    textDecoration: "none",
    marginRight: "1em",
  },
});

function Nav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (err) {}
  }

  return (
    <div style={{ marginBottom: "4em" }}>
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
            <Typography
              className={classes.navText}
              component={RouterLink}
              variant="subtitle1"
              to="/"
            >
              Homie
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <IconButton component={RouterLink} to="/new" aria-label="chats">
                <AddRoundedIcon />
              </IconButton>

              <IconButton component={RouterLink} to="/chats" aria-label="chats">
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>

              <IconButton aria-label="profile" onClick={handleClick}>
                <Avatar
                  alt={currentUser.displayName}
                  src={currentUser.photoURL}
                />
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
            </Box>
          </Grid>
        </Grid>
        <Divider />
      </AppBar>
    </div>
  );
}

export default Nav;
