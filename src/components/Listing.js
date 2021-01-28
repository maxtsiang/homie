import React, { useEffect, useState } from "react";
import { Typography, Divider, Card, Box, Grid } from "@material-ui/core";

import firebase from "../firebase";

import Profile from "./Profile";
import Interested from "./Interested";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles({
  card: {
    marginBottom: "1em",
    boxShadow: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardimg: {
    height: "auto",
    width: "100%",
    borderRadius: "1em",
  },
  item: {
    height: "100%",
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
      className={classes.card}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "45%",
        background: selected ? "#f1f1ee" : "none",
        borderRadius: "1em",
      }}
    >
      <Grid container display="flex" style={{ height: "100%" }}>
        <Grid
          item
          className={classes.item}
          xs={6}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.info.images && (
            <img
              src={props.info.images[0]}
              alt=""
              className={classes.cardimg}
            />
          )}
        </Grid>
        <Grid
          item
          className={classes.item}
          xs={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {creator && <Profile user={creator} />}
            <Typography noWrap variant="subtitle2">
              {moment(props.info.createdAt).fromNow().toUpperCase()}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" noWrap>
              ${props.info.price}/month
            </Typography>
            <Typography variant="subtitle2" noWrap>
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
              setDetailed={props.setDetailed}
            />
          </Box>
        </Grid>
      </Grid>

      <Divider />
    </Card>
  );
}

export default Listing;
