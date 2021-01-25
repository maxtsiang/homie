import { Grid, makeStyles, List } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import ChatWindow from "../components/ChatWindow";
import ChatContacts from "../components/ChatContacts";
import Typography from "@material-ui/core/Typography";

import firebase from "../firebase";

import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  container: {
    padding: "2em",
  },
  contacts: {
    height: "75vh",
    overflow: "scroll",
  },
});

const Chat = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(0);
  const selectedChat = chats[selected];

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        const currentUserChats = snapshot.data().chats;
        firebase
          .firestore()
          .collection("chats")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            currentUserChats
          )
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              const chatDoc = doc.data();
              const chatMembers = chatDoc.members;
              const otherUserId = Object.keys(chatMembers).find(
                (id) => id !== currentUser.uid
              );
              firebase
                .firestore()
                .collection("users")
                .doc(otherUserId)
                .get()
                .then((snapshot) => {
                  const otherUserDoc = snapshot.data();
                  const otherUser = {
                    id: otherUserId,
                    name: otherUserDoc.name,
                    profile: otherUserDoc.profile,
                  };
                  const newChat = {
                    id: doc.id,
                    otherUser,
                  };
                  setChats((prevChats) => [...prevChats, newChat]);
                });
            });
          });
      });
  }, [currentUser.uid]);

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item xs={3}>
        <Typography variant="h3">Chats</Typography>
        <List className={classes.contacts}>
          {chats.map((chat, index) => (
            <ChatContacts
              chat={chat}
              selected={selected === index}
              setSelected={() => setSelected(index)}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={9}>
        {selectedChat && <ChatWindow chat={selectedChat}></ChatWindow>}
      </Grid>
    </Grid>
  );
};

export default Chat;
