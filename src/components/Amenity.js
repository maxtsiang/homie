import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import WifiIcon from "@material-ui/icons/Wifi";

const useStyles = makeStyles({
  amenityBox: {
    display: "flex",
    marginRight: "2em",
  },
  icon: {
    marginRight: "0.5em",
  },
});

function Amenity(props) {
  const classes = useStyles();
  switch (props.id) {
    case "wifi":
      return (
        <Box className={classes.amenityBox}>
          <WifiIcon className={classes.icon} />
          <Typography variant="subtitle1">Wifi</Typography>
        </Box>
      );
    default:
      return <div>Amenity nothing</div>;
  }
}

export default Amenity;
