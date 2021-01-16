import React from "react";

import { Typography, Avatar, Box } from "@material-ui/core";

function Profile(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <Avatar alt={props.name} src={props.img} />
      </Box>
      <Box m={1}>
        <Typography variant="subtitle1">{props.name}</Typography>
      </Box>
    </Box>
  );
}

export default Profile;
