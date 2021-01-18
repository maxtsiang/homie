import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import WifiIcon from "@material-ui/icons/Wifi";
import KitchenIcon from "@material-ui/icons/Kitchen";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AcUnitIcon from "@material-ui/icons/AcUnit";

const useStyles = makeStyles({
  amenityBox: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.3em",
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
    case "kitchen":
      return (
        <Box className={classes.amenityBox}>
          <KitchenIcon className={classes.icon} />
          <Typography variant="subtitle1">Kitchen</Typography>
        </Box>
      );
    case "laundry":
      return (
        <Box className={classes.amenityBox}>
          <LocalLaundryServiceIcon className={classes.icon} />
          <Typography variant="subtitle1">Laundry</Typography>
        </Box>
      );
    case "gym":
      return (
        <Box className={classes.amenityBox}>
          <FitnessCenterIcon className={classes.icon} />
          <Typography variant="subtitle1">Gym</Typography>
        </Box>
      );
    case "ac":
      return (
        <Box className={classes.amenityBox}>
          <AcUnitIcon className={classes.icon} />
          <Typography variant="subtitle1">Air Conditioning</Typography>
        </Box>
      );
    default:
      return <div>Amenity Error</div>;
  }
}

export const amenitiesList = ["wifi", "kitchen", "laundry", "gym", "ac"];

export default Amenity;
