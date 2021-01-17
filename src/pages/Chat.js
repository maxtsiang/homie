import { Grid } from "@material-ui/core";
import React from "react";
import Nav from "../components/Nav";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  return (
    <div>
      <Nav></Nav>
      <Grid container>
        <Grid item xs={3}>
          <p> contacts area</p>
        </Grid>
        <Grid item xs={9}>
          <ChatWindow></ChatWindow>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
