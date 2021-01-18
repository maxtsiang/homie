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
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";

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

const ChatWindow = () => {
  const [textContent, setTextContent] = useState("");
  const [msgs, setMsgs] = useState([
    {
      msg: "your next line is jojo references are dumb",
      sentMessage: false,
      avatar: null,
    },
    {
      msg: "jojo references are dumb",
      sentMessage: true,
      avatar: null,
    },
  ]); // pulled from db in future
  const classes = useStyles();

  const messagesEnd = useRef();

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

  const sentMessage = (msgContent, avatar) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.invisible} />
        <Box className={classes.msgGroup}>
          <ListItemText
            className={classes.senttxtMsg}
            primary={msgContent}
          ></ListItemText>
          <ListItemAvatar>
            <Avatar alt="Max Tsiang" src={profile} />
          </ListItemAvatar>
        </Box>
      </ListItem>
    );
  };

  const receivedMessage = (msgContent, avatar) => {
    return (
      <ListItem className={classes.bubbleWrapper}>
        <Box className={classes.msgGroup}>
          <ListItemAvatar>
            <Avatar alt="Max Tsiang" src={profile} />
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
        {msgs.map((message) => {
          return message.sentMessage
            ? sentMessage(message.msg, message.avatar)
            : receivedMessage(message.msg, message.avatar);
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
          onClick={() => {
            setMsgs((oldMsgs) => [
              ...oldMsgs,
              {
                msg: textContent,
                sentMessage: true,
                avatar: null,
              },
            ]);
            setTextContent("");
            // this stuff will be replaced by saving to db
          }}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatWindow;
