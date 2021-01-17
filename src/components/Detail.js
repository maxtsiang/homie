import { IconButton, Box, Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import CloseIcon from "@material-ui/icons/Close";

import bedroom from "../dev-imgs/bedroom.jpg";
import profile from "../dev-imgs/profile.jpg";

import Map from "../components/Map";
import Profile from "../components/Profile";
import Amenity from "../components/Amenity";

const useStyles = makeStyles({
  headerBox: {
    marginBottom: "3em",
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    fontSize: "2.5em",
  },
  subheader: {
    fontSize: "1.2em",
    fontWeight: 500,
  },
  label: {
    fontSize: "1.5em",
    marginBottom: "0.5em",
  },
  labelBox: {
    marginBottom: "2em",
  },
  text: {
    fontSize: "1em",
    fontWeight: 400,
    maxWidth: "47em",
  },
});

function Detail(props) {
  const classes = useStyles();
  return (
    <Box>
      <IconButton onClick={() => props.close()}>
        <CloseIcon />
      </IconButton>

      <Box m={1}>
        <Carousel navButtonsAlwaysVisible autoPlay={false}>
          {[1, 2, 3].map((n) => (
            <img
              style={{ borderRadius: "0.7em", width: "47em" }}
              key={n}
              src={bedroom}
            />
          ))}
        </Carousel>
      </Box>

      <Box m={1} className={classes.headerBox}>
        <Box>
          <Typography variant="h3" className={classes.header}>
            $1000/month
          </Typography>
          <Typography variant="h4" className={classes.subheader}>
            1 PERSON • 2 BR, 5 BA • JAN 3 - FEB 7
          </Typography>
        </Box>
        <Profile name="Max Tsiang" img={profile} />
      </Box>

      <Box m={1} className={classes.labelBox}>
        <Typography variant="h6" className={classes.label}>
          Details
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          This unit was JUST finished with a full renovation of the kitchen and
          bath with all new fixtures, appliances, tile, stackable laundry
          center, and updated paint. It is a light-filled, spacious 2 bedroom
          apartment on the garden side of the building. It has two large
          bedrooms each containing a spacious closet, high ceilings, and
          year-round light.
        </Typography>
      </Box>

      <Box m={1} className={classes.labelBox}>
        <Typography variant="h6" className={classes.label}>
          Amenities
        </Typography>
        <Box display="flex">
          {[1, 2, 3].map((n) => {
            return <Amenity id="wifi" />;
          })}
        </Box>
      </Box>

      <Box m={1} className={classes.labelBox}>
        <Typography variant="h6" className={classes.label}>
          Location
        </Typography>
        <Map
          hovered={0}
          markers={[{ id: 0, lat: 39.9539, lng: -75.193 }]}
          height="30vh"
          width="46em"
        />
      </Box>
    </Box>
  );
}

export default Detail;
