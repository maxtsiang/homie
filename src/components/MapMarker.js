import { Typography, Grid, Box, Button, IconButton } from "@material-ui/core";

import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import ApartmentRoundedIcon from "@material-ui/icons/ApartmentRounded";

function MapMarker(props) {
  return (
    <div
      onMouseEnter={() => props.setHovered && props.setHovered(props.id)}
      onMouseLeave={() => props.setHovered && props.setHovered(-1)}
      onClick={() => props.setDetailed && props.setDetailed(props.id)}
    >
      {props.$hover || props.hovered ? (
        <ApartmentRoundedIcon color="secondary" fontSize="large" />
      ) : (
        <ApartmentRoundedIcon fontSize="large" />
      )}
    </div>
  );
}

export default MapMarker;
