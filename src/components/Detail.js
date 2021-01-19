import { IconButton, Box, Grid, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import CloseIcon from "@material-ui/icons/Close";

import bedroom from "../dev-imgs/bedroom.jpg";
import profile from "../dev-imgs/profile.jpg";

import Map from "../components/Map";
import Profile from "../components/Profile";
import Amenity from "../components/Amenity";
import moment from "moment";
import { storage } from "../firebase";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  headerBox: {
    marginBottom: "3em",
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    fontSize: "2.5em",
  },
  img: {
    borderRadius: "0.7em",
    width: "100%",
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
    maxWidth: "100%",
  },
});

function Detail(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);

  useEffect(() => {
    storage
      .ref(`listing_images/${props.info.id}`)
      .listAll()
      .then((res) => {
        res.items.forEach((img) => {
          img.getDownloadURL().then((url) => {
            setImages((prevImages) => [...prevImages, url]);
          });
        });
      });
  }, []);

  return (
    <Box>
      <IconButton onClick={() => props.close()}>
        <CloseIcon />
      </IconButton>

      <Box m={1}>
        <Carousel navButtonsAlwaysVisible autoPlay={false}>
          {images &&
            images.map((image, index) => (
              <img className={classes.img} key={index} src={image} />
            ))}
        </Carousel>
      </Box>

      <Box m={1} className={classes.headerBox}>
        <Box>
          <Typography variant="h3" className={classes.header}>
            ${props.info.price}/month
          </Typography>
          <Typography variant="h4" className={classes.subheader}>
            {props.info.persons} PERSON • {props.info.bedrooms} BR,{" "}
            {props.info.bathrooms} BA •{" "}
            {moment(props.info.start).format("MMM DD").toUpperCase()} -{" "}
            {moment(props.info.end).format("MMM DD").toUpperCase()}
          </Typography>
        </Box>
        <Profile name="Max Tsiang" img={profile} />
      </Box>

      <Box m={1} className={classes.labelBox}>
        <Typography variant="h6" className={classes.label}>
          Details
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          {props.info.description}
        </Typography>
      </Box>

      <Box m={1} className={classes.labelBox}>
        <Typography variant="h6" className={classes.label}>
          Amenities
        </Typography>
        <Box display="flex">
          {props.info.amenities.map((amenity) => {
            return <Amenity id={amenity} />;
          })}
        </Box>
      </Box>

      <Box m={1} className={classes.labelBox}>
        <Typography variant="h6" className={classes.label}>
          Location
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          {props.info.address}
        </Typography>
        <Map hovered={0} listings={[props.info]} height="30vh" width="100%" />
      </Box>
    </Box>
  );
}

export default Detail;
