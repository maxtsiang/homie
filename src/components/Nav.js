import React, { Component } from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";

function Nav() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={0}>
            <Grid item>
              <Typography variant="title">
                <Button component={Link} to="/">
                  Homie
                </Button>
              </Typography>
            </Grid>
            <Grid item>
              <div>
                <Typography variant="title">
                  <Button component={Link} to="/chats">
                    Chats
                  </Button>
                </Typography>
                <Typography variant="title">
                  <Button component={Link} to="/saved">
                    Saved
                  </Button>
                </Typography>
                <Typography variant="title">
                  <Button component={Link} to="/notifications">
                    Notifications
                  </Button>
                </Typography>
                <Typography variant="title">
                  <Button component={Link} to="/profile">
                    Profile
                  </Button>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
