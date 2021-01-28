import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  ListItem,
  Box,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import firebase from "../firebase";
import moment from "moment";

const useStyles = makeStyles(() => ({
  sender: {
    display: "flex",
    alignItems: "center",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "0.5em",
    "&:hover": {
      cursor: "pointer",
      background: "lightgrey",
    },
  },
}));

const ChatContacts = (props) => {
  const classes = useStyles();
  const [recentMessage, setRecentMessage] = useState();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chats")
      .doc(props.chat.id)
      .onSnapshot((snapshot) => {
        const chatDoc = snapshot.data();
        const last = chatDoc.recentMessage;
        if (last) {
          setRecentMessage(last);
        }
      });

    return () => unsubscribe();
  }, [props.chat]);
  return (
    <ListItem
      className={classes.listItem}
      style={{
        background: props.selected ? "lightgrey" : "none",
      }}
      onClick={() => props.setSelected()}
    >
      <Box className={classes.sender}>
        <ListItemAvatar>
          <Avatar
            alt={props.chat.otherUser.name}
            src={props.chat.otherUser.profile}
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.chat.otherUser.name}
          secondary={
            recentMessage
              ? recentMessage.content.length >= 10
                ? recentMessage.content + "..."
                : recentMessage.content
              : null
          }
        />
      </Box>
      <Box>
        {recentMessage && (
          <Typography variant="subtitle2">
            {moment(recentMessage.createdAt).fromNow().toUpperCase()}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};

export default ChatContacts;
