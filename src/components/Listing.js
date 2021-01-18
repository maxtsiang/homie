import React from "react";
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
} from "@material-ui/core";

import bedroom from "../dev-imgs/bedroom.jpg";
import profile from "../dev-imgs/profile.jpg";

import Profile from "./Profile";
import Interested from "./Interested";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    marginBottom: "1em",
    boxShadow: "none",
  },
  cardimg: {
    height: "100%",
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
  return (
    <Card
      onMouseEnter={() => props.setHovered(props.id)}
      onMouseLeave={() => props.setHovered(-1)}
      onClick={() => props.setDetailed(props.id)}
      className={classes.card}
      raised={props.id === props.hovered || props.id === props.detailed}
    >
      <CardActionArea>
        <Grid container display="flex">
          <Grid item className={classes.item}>
            <CardMedia
              image={bedroom}
              title="bedroom-pic"
              component="img"
              className={classes.cardimg}
            />
          </Grid>
          <Grid item className={classes.item}>
            <CardContent className={classes.content}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Profile name="Max Tsiang" img={profile} />
                <Typography variant="subtitle2">5 DAYS AGO</Typography>
              </Box>

              <Box>
                <Typography variant="h5">$1000/month</Typography>
                <Typography variant="subtitle2">
                  1 PERSON • 2 BR, 5, BA • JAN 3 - FEB 7
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
