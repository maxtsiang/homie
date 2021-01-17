import Listing from "../components/Listing";
import Map from "../components/Map";
import Filter from "../components/Filter";
import Detail from "../components/Detail";

import { Typography, Grid, Box, Button, IconButton } from "@material-ui/core";

import React, { useState } from "react";

import FilterListIcon from "@material-ui/icons/FilterList";

function Home() {
  const [filterMode, setFilterMode] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [detailed, setDetailed] = useState(-1);

  function setFilters() {
    console.log("FILTERS SET");
  }

  function clearFilters() {
    console.log("FILTERS CLEARED");
  }

  function cancel() {
    console.log("FILTERS CANCELLED");
    setFilterMode(false);
  }

  return (
    <div>
      <Grid container display="flex">
        <Grid item style={{ margin: "3em", width: "43vw" }}>
          {filterMode ? (
            <Box display="flex">
              <Typography variant="h3">Filter</Typography>
            </Box>
          ) : (
            <Box display="flex">
              <Typography variant="h3">Find a place</Typography>
              <IconButton
                aria-label="filter"
                onClick={() => setFilterMode(true)}
              >
                <FilterListIcon />
              </IconButton>
            </Box>
          )}

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: "1em" }}
          >
            <Typography variant="h4">
              23 places found near University of Pennsylvania
            </Typography>
            {!filterMode && <Button>Sort By</Button>}
          </Box>

          {filterMode ? (
            <Filter
              setFilters={setFilters}
              clearFilters={clearFilters}
              cancel={cancel}
            />
          ) : (
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
          )}
        </Grid>
        <Grid item style={{ margin: "3em", width: "42vw" }}>
          {detailed >= 0 && <Detail close={() => setDetailed(-1)} />}
          <Map
            hidden={detailed >= 0}
            hovered={hovered}
            markers={[{ id: 0, lat: 39.9539, lng: -75.193 }]}
            setHovered={setHovered}
            setDetailed={setDetailed}
            height="88vh"
            width="50%"
            // position="fixed"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
