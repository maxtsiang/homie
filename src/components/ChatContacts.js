import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import firebase from "../firebase";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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
      .doc(props.selectedChat.id)
      .onSnapshot((snapshot) => {
        const chatDoc = snapshot.data();
        const last = chatDoc.recentMessage;
        setRecentMessage(last);
      });

    return () => unsubscribe();
  }, [props.selectedChat]);
  return (
    <List>
      {recentMessage &&
        props.chats.map((chat, index) => (
          <ListItem
            className={classes.listItem}
            style={{
              background: props.selected === index ? "lightgrey" : "none",
            }}
            onClick={props.setSelected(index)}
          >
            <Box className={classes.sender}>
              <ListItemAvatar>
                <Avatar
                  alt={chat.otherUser.name}
                  src={chat.otherUser.profile}
                />
              </ListItemAvatar>
              <ListItemText
                primary={chat.otherUser.name}
                secondary={recentMessage.content}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {moment(recentMessage.createdAt).fromNow().toUpperCase()}
              </Typography>
            </Box>
          </ListItem>
        ))}
    </List>
  );
};

export default ChatContacts;
