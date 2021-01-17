import { Typography, Grid, Box, Button, IconButton } from "@material-ui/core";

import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

function MapMarker(props) {
  return (
    <div
      onMouseEnter={() => props.setHovered(props.id)}
      onMouseLeave={() => props.setHovered(-1)}
    >
      {props.$hover || props.hovered ? (
        <RoomRoundedIcon color="primary" fontSize="large" />
      ) : (
        <RoomRoundedIcon fontSize="large" />
      )}
    </div>
  );
}

export default MapMarker;
