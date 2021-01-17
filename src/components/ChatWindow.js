import { React, useState } from "react";
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

// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";

const useStyles = makeStyles({
  container: {
    border: "1px solid black",
    height: "70vh",
  },
  msgBar: {
    marginTop: "3vh",
    justifyContent: "space-between",
    width: "95%",
  },
  txtMsg: {
    border: "1px rounded black",
  },
  left: {},
  right: {},
});

const msgs = [];

const sentMessage = (msgContent, avatar) => {
  return (
    <ListItem>
      <ListItemText primary={msgContent} align="right"></ListItemText>
      <ListItemAvatar alt="Max Tsiang" src={avatar}></ListItemAvatar>
    </ListItem>
  );
};

const receivedMessage = (msgContent, avatar) => {
  return (
    <ListItem>
      <ListItemAvatar alt="Max Tsiang" src={avatar}></ListItemAvatar>
      <ListItemText primary={msgContent}></ListItemText>
    </ListItem>
  );
};

const ChatWindow = () => {
  const [textContent, setTextContent] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setTextContent(event.target.value);
  };

  return (
    <Box>
      <List className={classes.container}>
        {receivedMessage("your next line is 'jojo references are dumb'", null)}
        {sentMessage("jojo references are dumb", null)}
      </List>
      {/* need to prevent form from submitting */}
      <form className={classes.msgBar} noValidate autoComplete="off">
        <TextField
          variant="filled"
          value={textContent}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          //className={classes.button}
          endIcon={<Icon>send</Icon>}
          onClick={() => {
            msgs.push({ msg: textContent, sentMessage: true });
            setTextContent("");
          }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ChatWindow;
