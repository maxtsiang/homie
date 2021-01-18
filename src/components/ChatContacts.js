import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
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
  sender: {
    display: "flex",
    alignItems: "center",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const ChatContacts = () => {
  const classes = useStyles();

  const ChatPreview = (userName, avatar, lastmsg) => {
    return (
      <ListItem className={classes.listItem}>
        <Box className={classes.sender}>
          <ListItemAvatar>
            <Avatar alt="Max Tsiang" src={avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={userName}
            secondary={<React.Fragment>{lastmsg}</React.Fragment>}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2">1 MIN AGO</Typography>
        </Box>
      </ListItem>
    );
  };

  return (
    // obviously this will have to be a template that pulls data from the database
    <List>
      {ChatPreview("Max Tsiang", null, "hello this is a preview")}

      {ChatPreview("Max Tsiang", null, "hello this is another preview")}

      {ChatPreview("Max Tsiang", null, "wfjbfjewhflef")}
    </List>
  );
};

export default ChatContacts;
