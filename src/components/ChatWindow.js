import { React, useState, useEffect, useRef, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import profile from "../dev-imgs/profile.jpg";
import moment from "moment";
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    border: "1px solid lightgrey",
    borderRadius: "0.7em",
    height: "78vh",
    width: "80%",
    margin: "2em",
    overflow: "scroll",
  },
  msgBar: {
    marginTop: "3vh",
    justifyContent: "space-between",
    width: "95%",
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
  const messages = useMessages(props.chatId);

  const classes = useStyles();

  const messagesEnd = useRef();

  const handleSendMessage = () => {
    setTextContent("");
    firebase
      .firestore()
      .collection("messages")
      .doc(props.chatId)
      .collection("messages")
      .add({
        content: textContent,
        creator: currentUser.uid,
        createdAt: Number(moment().unix().valueOf() * 1000),
      });
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

  const sentMessage = (msgContent, user) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.invisible} />
        <Box className={classes.msgGroup}>
          <ListItemText
            className={classes.senttxtMsg}
            primary={msgContent}
          ></ListItemText>
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.profile} />
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
        {messages.map((message) => {
          return message.creator === currentUser.uid
            ? sentMessage(message.content, currentUser.uid)
            : receivedMessage(message.content, props.user);
        })}
        <div ref={messagesEnd} />
      </List>
      {/* need to prevent form from submitting */}
      <Paper className={classes.msgBox} elevation={0}>
        <TextField
          placeholder="Type your message..."
          multiline
          value={textContent}
          onChange={handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatWindow;
