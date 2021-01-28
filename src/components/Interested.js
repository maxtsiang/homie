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
    marginTop: "0.25em",
    background: "#ffcccc",
    "&:hover": {
      background: "#ff9eb5",
    },
  },
  interestedButtonSelected: {
    width: "100%",
    marginTop: "0.25em",
    background: "#ff9eb5",
    color: "white",
    "&:hover": {
      background: "#ffcccc",
    },
  },
  deleteButton: {
    width: "100%",
    marginTop: "0.25em",
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
  const [loading, setLoading] = useState(false);

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
    props.interested.slice(0, 3).forEach((id) => {
      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          const userDoc = snapshot.data();
          const user = {
            id: snapshot.id,
            name: userDoc.name,
            profile: userDoc.profile,
          };
          setInterestedUsers((prevUsers) => [...prevUsers, user]);
        });
    });
  }, []);

  useEffect(() => {
    interested_ref.get().then((snapshot) => {
      if (snapshot.exists) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    });
  }, []);

  async function handleClickInterested() {
    if (loading) {
      return;
    }

    setLoading(true);
    if (selected) {
      setInterestedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== currentUser.uid)
      );
      await interested_ref.delete();

      await listing_ref.update({
        interested: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
      });
      setLoading(false);
      setSelected(false);
    } else {
      setInterestedUsers((prevUsers) => [
        ...prevUsers,
        {
          id: currentUser.uid,
          name: currentUser.displayName,
          profile: currentUser.photoURL,
        },
      ]);

      await interested_ref.set({
        creator: currentUser.uid,
        listing: props.listingid,
      });

      await listing_ref.update({
        interested: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
      setLoading(false);
      setSelected(true);
    }
  }

  function handleInterestedOverlay() {
    props.handleInterestedOverlay();
    props.setInterestedUsers(interestedUsers);
  }

  function handleClickDelete() {
    listing_ref.delete();
    props.setDetailed(-1);
  }

  return (
    <Box>
      {props.interested && interestedUsers.length > 0 && (
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
                    key={user.id}
                    alt={user.name}
                    src={user.profile}
                    className={classes.avatar}
                  />
                );
              })}
            </AvatarGroup>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              className={classes.interestedText}
              noWrap
            >
              {interestedUsers[0].name}{" "}
              {props.interested.length > 1 ? (
                <>
                  and {props.interested.length - 1} other
                  {props.interested.length - 1 > 1 ? <>s</> : null}
                </>
              ) : null}
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
