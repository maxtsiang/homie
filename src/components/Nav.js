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
  icon: {
    height: "1.3em",
    width: "1.3em",
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
    <div style={{ margin: "3em" }}>
      <AppBar
        style={{
          background: "#FFFFFF",
          boxShadow: "none",
        }}
      >
        <Grid
          container
          display="flex"
          alignItems="center"
          justify="space-between"
          style={{ paddingLeft: "2em", paddingRight: "2em" }}
        >
          <Grid item>
            <Typography
              className={classes.navText}
              component={RouterLink}
              variant="subtitle1"
              to="/"
            >
              homie
            </Typography>
            <Typography
              className={classes.navText}
              component={RouterLink}
              variant="subtitle1"
              to="/feedback"
            >
              send feedback
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <IconButton component={RouterLink} to="/new">
                <AddRoundedIcon />
              </IconButton>

              <IconButton component={RouterLink} to="/chats">
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>

              <IconButton onClick={handleClick}>
                <Avatar
                  alt={currentUser.displayName}
                  src={currentUser.photoURL}
                  className={classes.icon}
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
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
