import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ChatContacts = () => {
  const classes = useStyles();
  return (
    // obviously this will have to be a template that pulls data from the database
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Max Tsiang" src="" />
        </ListItemAvatar>
        <ListItemText
          primary="Max Tsiang"
          secondary={
            <React.Fragment>{"text text text preview"}</React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Max Tsiang" src="" />
        </ListItemAvatar>
        <ListItemText
          primary="Max Tsiang"
          secondary={
            <React.Fragment>{"text text text preview"}</React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Max Tsiang" src="" />
        </ListItemAvatar>
        <ListItemText
          primary="Max Tsiang"
          secondary={
            <React.Fragment>{"text text text preview"}</React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
};

export default ChatContacts;
