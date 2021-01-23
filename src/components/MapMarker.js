import { makeStyles } from "@material-ui/core";

import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

const useStyles = makeStyles({
  icon: {
    height: "2em",
    width: "2em",
    transform: "translate(-50%, -100%)",

    "&:hover": {
      cursor: "pointer",
    },
  },
});

function MapMarker(props) {
  const classes = useStyles();
  return (
    <div
      onMouseEnter={() => props.setHovered && props.setHovered(props.id)}
      onMouseLeave={() => props.setHovered && props.setHovered(-1)}
      onClick={() => props.setDetailed && props.setDetailed(props.id)}
    >
      {props.$hover || props.hovered ? (
        <RoomRoundedIcon color="primary" className={classes.icon} />
      ) : (
        <RoomRoundedIcon className={classes.icon} />
      )}
    </div>
  );
}

export default MapMarker;
