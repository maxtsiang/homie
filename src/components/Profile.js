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
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  popoverContainer: {
    padding: "1.5em",
    width: "15vw",
  },
  habit: {
    color: "white",
    padding: "0.5em",
    borderRadius: "0.5em",
    margin: "0.2em",
  },
  button: {
    width: "100%",
  },
  group: {
    marginBottom: "1em",
  },
});
function Profile(props) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isSelfProfile = currentUser.uid === props.user.id;

  function handleChat() {
    firebase
      .firestore()
      .collection("chats")
      .where("members", "array-contains", currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          firebase
            .firestore()
            .collection("chats")
            .add({
              members: [props.user.id, currentUser.uid],
              creator: currentUser.uid,
              type: 1,
            })
            .then(async (docRef) => {
              await firebase
                .firestore()
                .collection("users")
                .doc(currentUser.uid)
                .update({
                  chats: firebase.firestore.FieldValue.arrayUnion(docRef.id),
                });

              await firebase
                .firestore()
                .collection("users")
                .doc(props.user.id)
                .update({
                  chats: firebase.firestore.FieldValue.arrayUnion(docRef.id),
                });
            });
        }
        history.push("/chats");
      });
  }

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
      {!isSelfProfile && props.popover && (
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
              onClick={handleChat}
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
