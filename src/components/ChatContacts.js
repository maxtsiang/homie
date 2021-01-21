import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase";

import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
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
    },
  },
}));

const ChatContacts = (props) => {
  const classes = useStyles();

  return (
    <List>
      {props.users.map((user, index) => (
        <ListItem
          className={classes.listItem}
          style={{
            background: props.selected === index ? "lightgrey" : "none",
          }}
          onClick={props.setSelected(index)}
        >
          <Box className={classes.sender}>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.profile} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={<React.Fragment>preview</React.Fragment>}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">1 MIN AGO</Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatContacts;
