import Listing from "../components/Listing";
import Map from "../components/Map";
import Detail from "../components/Detail";

import { Typography, Grid, Box, Button, IconButton } from "@material-ui/core";

import React, { useState } from "react";

import FilterListIcon from "@material-ui/icons/FilterList";

function Home() {
  const [hovered, setHovered] = useState(-1);
  const [detailed, setDetailed] = useState(-1);

  return (
    <div>
      <Grid container display="flex">
        <Grid item style={{ margin: "3em" }}>
          <Box display="flex">
            <Typography variant="h3">Find a place</Typography>
            <IconButton aria-label="filter">
              <FilterListIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: "1em" }}
          >
            <Typography variant="h4">
              23 places found near University of Pennsylvania
            </Typography>
            <Button>Sort By</Button>
          </Box>
          <Box>
            {[0, 1, 2, 3, 4].map((n) => {
              return (
                <Listing
                  id={n}
                  detailed={detailed}
                  hovered={hovered}
                  setHovered={setHovered}
                  setDetailed={setDetailed}
                />
              );
            })}
          </Box>
        </Grid>
        <Grid item style={{ margin: "3em" }}>
          {detailed >= 0 && <Detail close={() => setDetailed(-1)} />}
          <Map
            hidden={detailed >= 0}
            hovered={hovered}
            markers={[{ id: 0, lat: 39.9539, lng: -75.193 }]}
            setHovered={setHovered}
            setDetailed={setDetailed}
            height="88vh"
            width="48em"
            position="fixed"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
