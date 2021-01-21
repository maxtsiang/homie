import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
