import { Grid, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import ChatWindow from "../components/ChatWindow";
import ChatContacts from "../components/ChatContacts";
import Typography from "@material-ui/core/Typography";

import firebase from "../firebase";

import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  container: {
    margin: "3em",
  },
  header: {
    marginTop: "1em",
    marginLeft: "0.5em",
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

        if (currentUserChats) {
          currentUserChats.forEach((chatId) => {
            firebase
              .firestore()
              .collection("chats")
              .doc(chatId)
              .get()
              .then((snapshot) => {
                const chatDoc = snapshot.data();
                const chatMembers = chatDoc.members;
                const otherUserId = chatMembers.find(
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
                      id: chatId,
                      otherUser,
                    };
                    setChats((prevChats) => [...prevChats, newChat]);
                  });
              });
          });
        }
      });
  }, [currentUser.uid]);

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Typography variant="h3" className={classes.header}>
            Chats
          </Typography>
          {selectedChat && (
            <ChatContacts
              chats={chats}
              selected={selected}
              selectedChat={selectedChat}
              setSelected={setSelected}
            ></ChatContacts>
          )}
        </Grid>
        <Grid item xs={9}>
          {selectedChat && <ChatWindow chat={selectedChat}></ChatWindow>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
