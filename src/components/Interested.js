import React from "react";

import { Typography, Avatar, Box } from "@material-ui/core";

import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    height: "1em",
    width: "1em",
  },
});

function Interested(props) {
  const classes = useStyles();
  return (
    <Box container display="flex" alignItems="center">
      <Box>
        <AvatarGroup max={3} spacing="small">
          <Avatar
            alt={props.names}
            src={props.imgs}
            className={classes.avatar}
          />
          <Avatar
            alt={props.names}
            src={props.imgs}
            className={classes.avatar}
          />
          <Avatar
            alt={props.names}
            src={props.imgs}
            className={classes.avatar}
          />
        </AvatarGroup>
      </Box>
      <Box>
        <Typography variant="subtitle1">
          Max Tsiang and 7 others interested
        </Typography>
      </Box>
    </Box>
  );
}

export default Interested;
