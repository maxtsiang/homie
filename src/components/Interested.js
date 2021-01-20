import React, { useEffect, useState } from "react";

import { Typography, Avatar, Box, Button } from "@material-ui/core";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";

import firebase from "../firebase";

const useStyles = makeStyles({
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
    props.interested.map((id) => {
      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          const user = {
            id: snapshot.id,
            name: snapshot.data().name,
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

  function handleClickInterested() {
    if (selected) {
      interested_ref.delete();

      listing_ref.update({
        interested: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
      });

      setSelected(false);

      setInterestedUsers(
        interestedUsers.filter((user) => user.id !== currentUser.uid)
      );
    } else {
      interested_ref.set({
        creator: currentUser.uid,
        listing: props.listingid,
      });

      listing_ref.update({
        interested: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });

      setSelected(true);

      const currentUserObject = {
        id: currentUser.uid,
        name: currentUser.displayName,
      };
      setInterestedUsers((prevUsers) => [...prevUsers, currentUserObject]);
    }
  }

  return (
    <Box>
      {interestedNumber > 0 && (
        <Box container display="flex" alignItems="center">
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
                    src={props.imgs}
                    className={classes.avatar}
                  />
                );
              })}
            </AvatarGroup>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              {interestedUsers[0].name}{" "}
              {interestedNumber - 3 > 0 ? (
                <>and {interestedNumber} others</>
              ) : null}{" "}
              interested
            </Typography>
          </Box>
        </Box>
      )}

      <Button
        className={
          selected ? classes.interestedButtonSelected : classes.interestedButton
        }
        variant="contained"
        disableElevation
        onClick={handleClickInterested}
      >
        <FavoriteBorderRoundedIcon style={{ marginRight: "0.2em" }} />
        {selected ? <>Interested!</> : <>Interested</>}
      </Button>
    </Box>
  );
}

export default Interested;
