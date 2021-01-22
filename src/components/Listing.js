import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Grid,
} from "@material-ui/core";

import firebase from "../firebase";

import Profile from "./Profile";
import Interested from "./Interested";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

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
});

function Listing(props) {
  const classes = useStyles();
  const [creator, setCreator] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.info.creator)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        const user = {
          name: doc.name,
          profile: doc.profile,
        };
        setCreator(user);
      });
  }, [props.info]);

  const selected =
    props.index === props.hovered || props.index === props.detailed;

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
              <img
                src={props.info.images[0]}
                alt=""
                className={classes.cardimg}
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
                {creator && <Profile user={creator} />}
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
                <Interested
                  listingid={props.info.id}
                  interested={props.info.interested}
                  edit={props.edit}
                  handleInterestedOverlay={props.handleInterestedOverlay}
                  setInterestedUsers={props.setInterestedUsers}
                />
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
