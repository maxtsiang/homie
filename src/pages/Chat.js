import { Grid } from "@material-ui/core";
import React from "react";
import Nav from "../components/Nav";
import ChatWindow from "../components/ChatWindow";
import ChatContacts from "../components/ChatContacts";

const Chat = () => {
  return (
    <div>
      <Nav></Nav>
      <Grid container style={{ marginTop: "5em" }}>
        <Grid item xs={3}>
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
