import React, { useEffect, useState } from "react";

import { Typography, Avatar, Box, Button } from "@material-ui/core";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";

import firebase from "../firebase";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  interestedText: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  avatar: {
    height: "1em",
    width: "1em",
  },
  avatarGroup: {
    marginRight: "0.5em",
  },
  interestedButton: {
    width: "100%",
    padding: "0.5em",
    marginTop: "1em",
    background: "#ffcccc",
    "&:hover": {
      background: "#ff9eb5",
    },
  },
  interestedButtonSelected: {
    width: "100%",
    padding: "0.5em",
    marginTop: "1em",
    background: "#ff9eb5",
    color: "white",
    "&:hover": {
      background: "#ffcccc",
    },
  },
  deleteButton: {
    width: "100%",
    padding: "0.5em",
    marginTop: "1em",
    background: "#FF6961",
    "&:hover": {
      background: "#FF1205",
    },
    color: "white",
  },
});

function Interested(props) {
  const classes = useStyles();

  const [selected, setSelected] = useState();
  const [interestedUsers, setInterestedUsers] = useState([]);
  const interestedNumber = interestedUsers.length;

  const { currentUser } = useAuth();

  const interested_ref = firebase
    .firestore()
    .collection("interested")
    .doc(`${currentUser.uid}_${props.listingid}`);

  const listing_ref = firebase
    .firestore()
    .collection("listings")
    .doc(props.listingid);

  useEffect(() => {
    setInterestedUsers([]);
    props.interested.forEach((id) => {
      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          const user = {
            id: snapshot.id,
            ...snapshot.data(),
          };
          setInterestedUsers((prevUsers) => [...prevUsers, user]);
        });
    });
  }, [props.interested]);

  useEffect(() => {
    interested_ref.get().then((snapshot) => {
      if (snapshot.exists) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    });
  }, [interested_ref]);

  function handleClickInterested() {
    if (selected) {
      interested_ref.delete();

      listing_ref.update({
        interested: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
      });

      setSelected(false);
    } else {
      interested_ref.set({
        creator: currentUser.uid,
        listing: props.listingid,
      });

      listing_ref.update({
        interested: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });

      setSelected(true);
    }
  }

  function handleInterestedOverlay() {
    props.handleInterestedOverlay();
    props.setInterestedUsers(interestedUsers);
  }

  function handleClickDelete() {
    listing_ref.delete();
  }

  return (
    <Box>
      {interestedNumber > 0 && (
        <Box
          container
          display="flex"
          alignItems="center"
          onClick={handleInterestedOverlay}
        >
          <Box>
            <AvatarGroup
              max={3}
              spacing="small"
              className={classes.avatarGroup}
            >
              {interestedUsers.map((user) => {
                return (
                  <Avatar
                    alt={user.name}
                    src={user.profile}
                    className={classes.avatar}
                  />
                );
              })}
            </AvatarGroup>
          </Box>
          <Box>
            <Typography variant="subtitle1" className={classes.interestedText}>
              {interestedUsers[0].name}{" "}
              {interestedNumber > 1 ? (
                <>and {interestedNumber - 1} others</>
              ) : null}{" "}
              interested
            </Typography>
          </Box>
        </Box>
      )}
      {props.edit ? (
        <Button
          className={classes.deleteButton}
          style={{ marginRight: "0.2em" }}
          disableElevation
          variant="contained"
          onClick={handleClickDelete}
        >
          <DeleteIcon /> Delete
        </Button>
      ) : (
        <Button
          className={
            selected
              ? classes.interestedButtonSelected
              : classes.interestedButton
          }
          variant="contained"
          disableElevation
          onClick={handleClickInterested}
        >
          <FavoriteBorderRoundedIcon style={{ marginRight: "0.2em" }} />
          {selected ? <>Interested!</> : <>Interested</>}
        </Button>
      )}
    </Box>
  );
}

export default Interested;
