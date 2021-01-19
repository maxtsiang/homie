import Listing from "../components/Listing";
import Map from "../components/Map";
import Filter from "../components/Filter";
import Detail from "../components/Detail";

import {
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import React, { useEffect, useState } from "react";

import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const useStyles = makeStyles({
  header: {
    marginBottom: "1em",
  },

  item: {
    width: "50%",
    padding: "3em",
  },
  subheader: {
    color: "lightgrey",
  },
});

const SORT_OPTIONS = {
  PRICE_ASC: { column: "price", direction: "asc" },
  AVAILABILITY_ASC: { column: "start", direction: "asc" },
  CREATEDAT_DESC: { column: "createdAt", direction: "desc" },
};

function useListings(sortBy = "CREATEDAT_DESC") {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("listings")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newListings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(newListings);
      });

    return () => unsubscribe();
  }, [sortBy]);

  return listings;
}

function Home() {
  const classes = useStyles();

  const [filterMode, setFilterMode] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [detailed, setDetailed] = useState(-1);

  const [filters, setFilters] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("CREATEDAT_DESC");

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, option) => {
    setSortBy(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listings = useListings(sortBy);
  let filteredListings = listings;

  function filter(list) {
    // console.log(Object.keys(filters).length);

    for (let name in filters) {
      switch (name) {
        case "min":
          list = list.filter((i) => i.price >= filters[name]);
          continue;
        case "max":
          list = list.filter((i) => i.price <= filters[name]);
          continue;
        case "start":
          list = list.filter((i) => i.start >= filters[name]);
          continue;
        case "end":
          list = list.filter((i) => i.end <= filters[name]);
          continue;
        case "persons":
          list = list.filter((i) => i.persons === filters[name]);
          continue;
        case "bedrooms":
          list = list.filter((i) => i.bedrooms === filters[name]);
          continue;
        case "bathrooms":
          list = list.filter((i) => i.bathrooms === filters[name]);
          continue;
        default:
          continue;
      }
    }
    return list;
  }

  function addFilter(name, val) {
    setFilters((prevFilters) => {
      return { ...prevFilters, [name]: val };
    });
  }

  function clearFilters() {
    setFilters({});
  }

  filteredListings = filter(filteredListings);

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
                <Badge
                  badgeContent={Object.keys(filters).length}
                  color="primary"
                >
                  <TuneRoundedIcon />
                </Badge>
              </IconButton>
            </Box>
          )}

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4" className={classes.subheader}>
              {filteredListings.length} places found near University of
              Pennsylvania
            </Typography>
            {!filterMode && (
              <>
                <List aria-label="Sort by">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    onClick={handleClickListItem}
                  >
                    <ListItemText primary="SORT BY" />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    selected={sortBy === "PRICE_ASC"}
                    onClick={(event) => handleMenuItemClick(event, "PRICE_ASC")}
                  >
                    Price (cheapest first)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "AVAILABILITY_ASC"}
                    onClick={(event) =>
                      handleMenuItemClick(event, "AVAILABILITY_ASC")
                    }
                  >
                    Availability (earliest first)
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>

        {filterMode ? (
          <Filter
            filters={filters}
            addFilter={addFilter}
            close={() => setFilterMode(false)}
            clearFilters={clearFilters}
          />
        ) : (
          <Box>
            {filteredListings &&
              filteredListings.map((listing, index) => {
                return (
                  <Listing
                    index={index}
                    id={listing.id}
                    detailed={detailed}
                    hovered={hovered}
                    setHovered={setHovered}
                    setDetailed={setDetailed}
                    info={listing}
                  />
                );
              })}
          </Box>
        )}
      </Grid>

      <Grid item className={classes.item}>
        {detailed >= 0 && (
          <Detail
            close={() => setDetailed(-1)}
            info={filteredListings[detailed]}
          />
        )}
        <Map
          hidden={detailed >= 0}
          hovered={hovered}
          listings={filteredListings}
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
