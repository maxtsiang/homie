import React, { useEffect } from "react";

import {
  Typography,
  Avatar,
  Box,
  Popover,
  makeStyles,
  Chip,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  popoverContainer: {
    padding: "1.5em",
    width: "15vw",
  },
  habit: {
    color: "white",
    padding: "0.5em",
    borderRadius: "0.5em",
    margin: "0.5em",
  },
  button: {
    width: "100%",
  },
  group: {
    marginBottom: "1em",
  },
});
function Profile(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        onClick={handleClick}
        style={{ cursor: props.popover ? "pointer" : null }}
      >
        <Box>
          <Avatar alt={props.user.name} src={props.user.profile} />
        </Box>
        <Box m={1}>
          <Typography variant="subtitle1">{props.user.name}</Typography>
        </Box>
      </Box>
      {props.popover && (
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
          <Box className={classes.popoverContainer}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className={classes.group}
            >
              <Typography variant="subtitle1">
                {props.user.major} @ Penn '{props.user.grad - 2000} (
                {props.user.greek})
              </Typography>
              <Typography variant="subtitle2">{props.user.pronouns}</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" className={classes.group}>
              {props.user.habits.map((habit) => (
                <Chip
                  key={habit.id}
                  label={habit.name}
                  className={classes.habit}
                  style={{ background: habit.color }}
                />
              ))}
            </Box>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Chat
            </Button>
          </Box>
        </Popover>
      )}
    </>
  );
}

export default Profile;
