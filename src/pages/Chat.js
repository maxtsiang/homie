import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

import ChatWindow from "../components/ChatWindow";
import ChatContacts from "../components/ChatContacts";
import Typography from "@material-ui/core/Typography";

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
  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Typography variant="h3" className={classes.header}>
            Chats{" "}
          </Typography>
          <ChatContacts></ChatContacts>
        </Grid>
        <Grid item xs={9}>
          <ChatWindow></ChatWindow>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
