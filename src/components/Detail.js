import {
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import CloseIcon from "@material-ui/icons/Close";

import Map from "../components/Map";
import Profile from "../components/Profile";
import Amenity from "../components/Amenity";
import moment from "moment";
import { storage } from "../firebase";
import React, { useEffect, useState } from "react";

import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    overflow: "scroll",
  },
  imgWrapper: {
    height: "45vh",
    display: "flex",
    alignItems: "center",
  },
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
    width: "auto",
    maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
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
  const [creator, setCreator] = useState();

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
    firebase
      .firestore()
      .collection("users")
      .doc(props.info.creator)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        const user = {
          id: snapshot.id,
          ...doc,
        };
        setCreator(user);
      });
  }, [props.info.creator, props.info.id]);

  console.log(props.info);

  return (
    <Box
      className={classes.container}
      style={{
        height: props.height,
        width: props.width,
        position: props.position,
      }}
    >
      <IconButton onClick={() => props.close()}>
        <CloseIcon />
      </IconButton>

      <Box m={1}>
        <Carousel navButtonsAlwaysVisible autoPlay={false}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div className={classes.imgWrapper}>
                <img
                  className={classes.img}
                  key={index}
                  src={image}
                  alt={image.name}
                />
              </div>
            ))
          ) : (
            <div className={classes.imgWrapper}>
              <CircularProgress className={classes.img} />
            </div>
          )}
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
        {creator && <Profile user={creator} popover />}
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
        <Map
          hovered={0}
          listings={[props.info]}
          height="30vh"
          width="100%"
          center={{
            lat: props.info.location.latitude,
            lng: props.info.location.longitude,
          }}
        />
      </Box>
    </Box>
  );
}

export default Detail;
