import React from "react";

import { Typography, Avatar, Box } from "@material-ui/core";

import AvatarGroup from "@material-ui/lab/AvatarGroup";

function Interested(props) {
  return (
    <Box container display="flex" alignItems="center">
      <Box>
        <AvatarGroup max={3} spacing="small">
          <Avatar
            alt={props.names}
            src={props.imgs}
            style={{ height: "1em", width: "1em" }}
          />
          <Avatar
            alt={props.names}
            src={props.imgs}
            style={{ height: "1em", width: "1em" }}
          />
          <Avatar
            alt={props.names}
            src={props.imgs}
            style={{ height: "1em", width: "1em" }}
          />
        </AvatarGroup>
      </Box>
      <Box m={0.5}>
        <Typography variant="subtitle1">
          Max Tsiang and 7 others interested
        </Typography>
      </Box>
    </Box>
  );
}

export default Interested;
