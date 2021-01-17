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
} from "@material-ui/core";

import bedroom from "../dev-imgs/bedroom.jpg";
import profile from "../dev-imgs/profile.jpg";

import Profile from "./Profile";
import Interested from "./Interested";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";

function Listing(props) {
  return (
    <div
      onMouseEnter={() => props.setHovered(props.id)}
      onMouseLeave={() => props.setHovered(-1)}
      onClick={() => props.setDetailed(props.id)}
    >
      <Card
        style={{ marginBottom: "1em", boxShadow: "none" }}
        raised={props.id === props.hovered || props.id === props.detailed}
      >
        <CardActionArea
          style={{
            display: "flex",
          }}
        >
          <CardMedia
            image={bedroom}
            title="bedroom-pic"
            component="img"
            style={{ width: "35em", padding: "2em", borderRadius: "2.5em" }}
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "24em",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Profile name="Max Tsiang" img={profile} />
              <Typography variant="subtitle2">5 DAYS AGO</Typography>
            </Box>

            <Box>
              <Typography variant="h6">$1000/month</Typography>
              <Typography variant="subtitle2">
                1 PERSON • 2 BR, 5, BA • JAN 3 - FEB 7
              </Typography>
            </Box>

            <Box>
              <Interested names="Max Tsiang" imgs={profile} />
              <Button style={{ width: "20em" }}>
                <FavoriteBorderRoundedIcon style={{ marginRight: "0.2em" }} />{" "}
                Interested
              </Button>
              <IconButton>
                <ShareRoundedIcon />
              </IconButton>
            </Box>
          </CardContent>
        </CardActionArea>
        <Divider />
      </Card>
    </div>
  );
}

export default Listing;
