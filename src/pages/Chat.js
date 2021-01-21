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
  const [chatUsers, setChatUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const currentUserDoc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();

      const chatIds = currentUserDoc.data().chats;

      if (chatIds) {
        setChatRooms(chatIds);
        chatIds.map(async (id) => {
          const chatRoomDoc = await firebase
            .firestore()
            .collection("chats")
            .doc(id)
            .get();
          const members = chatRoomDoc.data().members;
          const userId = members.find((id) => id !== currentUser.uid);
          const userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .get();
          const user = {
            id: userId,
            name: userDoc.data().name,
            profile: userDoc.data().profile,
          };
          setChatUsers((oldUser) => [...oldUser, user]);
        });
      }
    }
    fetchData();
  }, [currentUser.uid]);

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Typography variant="h3" className={classes.header}>
            Chats
          </Typography>
          <ChatContacts
            users={chatUsers}
            selected={selected}
            setSelected={setSelected}
          ></ChatContacts>
        </Grid>
        <Grid item xs={9}>
          <ChatWindow
            chatId={chatRooms[selected]}
            user={chatUsers[selected]}
          ></ChatWindow>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
