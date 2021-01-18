import Listing from "../components/Listing";
import Map from "../components/Map";
import Filter from "../components/Filter";
import Detail from "../components/Detail";

import { Typography, Grid, Box, Button, IconButton } from "@material-ui/core";

import React, { useState } from "react";

import FilterListIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  header: {
    marginBottom: "1em",
  },

  item: {
    width: "50%",
    padding: "3em",
  },
});

function Home() {
  const classes = useStyles();
  const { currentUser } = useAuth();
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
    console.log(currentUser);
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item className={classes.item}>
        <Box className={classes.header}>
          {filterMode ? (
            <Typography variant="h3">Filter</Typography>
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
          >
            <Typography variant="h4">
              23 places found near University of Pennsylvania
            </Typography>
            {!filterMode && <Button>Sort By</Button>}
          </Box>
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

      <Grid item className={classes.item}>
        {detailed >= 0 && <Detail close={() => setDetailed(-1)} />}
        <Map
          hidden={detailed >= 0}
          hovered={hovered}
          markers={[{ id: 0, lat: 39.9539, lng: -75.193 }]}
          setHovered={setHovered}
          setDetailed={setDetailed}
          height="88vh"
          width="45%"
          position="fixed"
        />
      </Grid>
    </Grid>
  );
}

export default Home;
