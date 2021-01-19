import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  IconButton,
  Box,
  Grid,
  CircularProgress,
} from "@material-ui/core";

import bedroom from "../dev-imgs/bedroom.jpg";
import profile from "../dev-imgs/profile.jpg";

import Profile from "./Profile";
import Interested from "./Interested";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { storage } from "../firebase";

const useStyles = makeStyles({
  card: {
    marginBottom: "1em",
    boxShadow: "none",
    height: "100%",
  },
  cardSelected: {
    marginBottom: "1em",
    boxShadow: "1em",
    height: "20%",
  },
  cardimg: {
    height: "auto",
    width: "100%",
    borderRadius: "1em",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 0,

    height: "100%",
  },
  header: {
    marginTop: "1em",
    marginBottom: "1em",
  },
  item: {
    height: "30vh",
    width: "50%",
    padding: "1em",
  },
  interestedButton: {
    width: "100%",
    padding: "0.5em",
    marginTop: "1em",
    background: "#ffcccc",
  },
});

function Listing(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const selected =
    props.index === props.hovered || props.index === props.detailed;

  const imageLoaded = () => {
    setLoading(false);
    console.log("LOADED");
  };

  return (
    <Card
      onMouseEnter={() => props.setHovered(props.index)}
      onMouseLeave={() => props.setHovered(-1)}
      onClick={() => props.setDetailed(props.index)}
      className={selected ? classes.cardSelected : classes.card}
    >
      <CardActionArea>
        <Grid container display="flex">
          <Grid item className={classes.item}>
            <Box
              display="flex"
              alignItems="center"
              style={{
                height: "100%",
              }}
            >
              {loading && <CircularProgress />}
              <img
                src={images[0]}
                className={classes.cardimg}
                onLoad={() => imageLoaded()}
              />
            </Box>
          </Grid>
          <Grid item className={classes.item}>
            <CardContent className={classes.content}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Profile name="Max Tsiang" img={profile} />
                <Typography variant="subtitle2">
                  {moment(props.info.createdAt).fromNow().toUpperCase()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5">${props.info.price}/month</Typography>
                <Typography variant="subtitle2">
                  {props.info.persons} PERSON • {props.info.bedrooms} BR,{" "}
                  {props.info.bathrooms} BA •{" "}
                  {moment(props.info.start).format("MMM DD").toUpperCase()} -{" "}
                  {moment(props.info.end).format("MMM DD").toUpperCase()}
                </Typography>
              </Box>

              <Box>
                <Interested names="Max Tsiang" imgs={profile} />
                <Button
                  className={classes.interestedButton}
                  variant="contained"
                  disableElevation
                >
                  <FavoriteBorderRoundedIcon style={{ marginRight: "0.2em" }} />{" "}
                  Interested
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
      <Divider />
    </Card>
  );
}

export default Listing;
