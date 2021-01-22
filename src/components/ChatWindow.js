import { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Box,
  Paper,
} from "@material-ui/core";

import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    height: "80vh",
    width: "80%",
    margin: "2em",
    overflow: "scroll",
  },
  receivedtxtMsg: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    padding: "0.5em",
  },
  senttxtMsg: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    background: "lightgrey",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    padding: "0.5em",
    marginRight: "1em",
  },
  invisible: {
    width: "60%",
  },
  bubbleWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  msgGroup: {
    display: "flex",
    alignItems: "center",
  },
  msgBox: {
    position: "fixed",
    top: "auto",
    right: "auto",
    left: "auto",
    bottom: "2em",
    display: "flex",
    alignItems: "center",
    width: "60%",
    background: "white",
    padding: "0.5em",
  },
  button: {
    margin: "1em",
  },
});

function useMessages(id) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, [id]);

  return messages;
}

const ChatWindow = (props) => {
  const [textContent, setTextContent] = useState("");
  const { currentUser } = useAuth();

  const messages = useMessages(props.chat.id);

  const classes = useStyles();

  const messagesEnd = useRef();

  const handleSendMessage = (e) => {
    e.preventDefault();
    setTextContent("");
    const time = Number(moment().unix().valueOf() * 1000);
    firebase
      .firestore()
      .collection("messages")
      .doc(props.chat.id)
      .collection("messages")
      .add({
        content: textContent,
        creator: currentUser.uid,
        createdAt: time,
      });
    // firebase
    //   .firestore()
    //   .collection("chats")
    //   .doc(props.chat.id)
    //   .update({
    //     lastUpdated: time,
    //     recentMessage: {
    //       content: textContent,
    //       creator: currentUser.uid,
    //       createdAt: time,
    //     },
    //   });
  };

  const handleChange = (event) => {
    setTextContent(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
      scrollToBottom();
    }
  });

  const sentMessage = (msgContent) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.invisible} />
        <Box className={classes.msgGroup}>
          <ListItemText
            className={classes.senttxtMsg}
            primary={msgContent}
          ></ListItemText>
          <ListItemAvatar>
            <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
          </ListItemAvatar>
        </Box>
      </ListItem>
    );
  };

  const receivedMessage = (msgContent, user) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.msgGroup}>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.profile} />
          </ListItemAvatar>
          <ListItemText
            className={classes.receivedtxtMsg}
            primary={msgContent}
          ></ListItemText>
        </Box>
        <Box className={classes.invisible} />
      </ListItem>
    );
  };

  return (
    <Box className={classes.container}>
      <List>
        {props.chat &&
          messages.map((message) => {
            return message.creator === currentUser.uid
              ? sentMessage(message.content)
              : receivedMessage(message.content, props.chat.otherUser);
          })}
        <div ref={messagesEnd} />
      </List>
      <Paper elevation={0}>
        <form className={classes.msgBox} onSubmit={handleSendMessage}>
          <TextField
            placeholder="Type your message..."
            value={textContent}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Send
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ChatWindow;
