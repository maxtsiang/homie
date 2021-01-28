import { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  Avatar,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    height: "80vh",
    width: "50vw",
    overflow: "scroll",
  },
  receivedtxtMsg: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    padding: "0.5em",
    paddingLeft: "0.75em",
    paddingRight: "0.75em",
  },
  senttxtMsg: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    background: "lightgrey",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    padding: "0.5em",
    marginRight: "0.25em",
    paddingLeft: "0.75em",
    paddingRight: "0.75em",
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
    display: "flex",
    alignItems: "center",
    width: "50vw",
    background: "white",
  },
  button: {
    boxShadow: "none",
    margin: "1em",
  },
});

const LIMIT = 15;

const ChatWindow = (props) => {
  const [textContent, setTextContent] = useState("");
  const { currentUser } = useAuth();

  const [lastMessage, setLastMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const messagesEnd = useRef();

  function getMessages() {
    setLoading(true);
    firebase
      .firestore()
      .collection("messages")
      .doc(props.chat.id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .startAfter(lastMessage)
      .limit(LIMIT)
      .get()
      .then((snapshot) => {
        const messages = snapshot.docs.reverse();
        if (messages.length > 0) {
          const newMessages = messages.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages((oldMessages) => [...newMessages, ...oldMessages]);
          setLastMessage(messages[0]);
        } else {
          setIsEnd(true);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    setMessages([]);
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .doc(props.chat.id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(LIMIT)
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.reverse();
        if (messages.length > 0) {
          const newMessages = messages.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setIsEnd(false);
          setMessages(newMessages);
          setLastMessage(messages[0]);
          scrollToBottom();
        }
      });

    return () => unsubscribe();
  }, [props.chat]);

  const classes = useStyles();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (textContent === "") {
      return;
    }
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
    firebase
      .firestore()
      .collection("chats")
      .doc(props.chat.id)
      .update({
        lastUpdated: time,
        recentMessage: {
          content: textContent.substring(0, 10),
          creator: currentUser.uid,
          createdAt: time,
        },
      });
    scrollToBottom();
  };

  const handleChange = (event) => {
    setTextContent(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop < 0) {
      if (!loading && !isEnd) {
        getMessages();
      }
    }
  };

  const sentMessage = (msgContent) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.invisible} />
        <Box className={classes.msgGroup}>
          <ListItemText
            className={classes.senttxtMsg}
            primary={msgContent}
          ></ListItemText>
          {/* <ListItemAvatar>
            <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
          </ListItemAvatar> */}
        </Box>
      </ListItem>
    );
  };

  const receivedMessage = (msgContent, user) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.msgGroup}>
          {/* <ListItemAvatar>
            <Avatar alt={user.name} src={user.profile} />
          </ListItemAvatar> */}
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
    <Grid container direction="column">
      <Grid item xs={9}>
        <Box className={classes.container} onScroll={handleScroll}>
          <List>
            {isEnd && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="subtitle2">End of messages</Typography>
              </Box>
            )}
            {loading && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress size={30} />
              </Box>
            )}

            {props.chat &&
              messages.map((message) => {
                return message.creator === currentUser.uid
                  ? sentMessage(message.content)
                  : receivedMessage(message.content, props.chat.otherUser);
              })}
            <div ref={messagesEnd} />
          </List>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <form className={classes.msgBox} onSubmit={handleSendMessage}>
          <TextField
            placeholder="Type your message..."
            value={textContent}
            onChange={handleChange}
            style={{ width: "100%" }}
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
      </Grid>
    </Grid>
  );
};

export default ChatWindow;
