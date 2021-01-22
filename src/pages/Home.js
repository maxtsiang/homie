import Listing from "../components/Listing";
import Map from "../components/Map";
import Filter from "../components/Filter";
import Detail from "../components/Detail";

import {
  Typography,
  Grid,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Button,
  Paper,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

import React, { useEffect, useState } from "react";

import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import Profile from "../components/Profile";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  overlay: {
    padding: "1em",
    width: "15%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
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
}));

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

function Home(props) {
  const classes = useStyles();

  const [filterMode, setFilterMode] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [detailed, setDetailed] = useState(-1);

  const [filters, setFilters] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("CREATEDAT_DESC");

  const { currentUser } = useAuth();

  const handleOpenSortBy = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortBy = (option) => {
    setSortBy(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listings = useListings(sortBy);
  let filteredListings = listings;

  function filter(list) {
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

  const [openInterestedOverlay, setOpenInterestedOverlay] = useState(false);
  const handleCloseInterestedOverlay = () => {
    setOpenInterestedOverlay(false);
  };
  const handleToggleInterestedOverlay = () => {
    setOpenInterestedOverlay(!openInterestedOverlay);
  };

  const [interestedUsers, setInterestedUsers] = useState([]);

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
                <Button onClick={handleOpenSortBy}>Sort By</Button>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    selected={sortBy === "PRICE_ASC"}
                    onClick={() => handleSortBy("PRICE_ASC")}
                  >
                    Price (cheapest first)
                  </MenuItem>
                  <MenuItem
                    selected={sortBy === "AVAILABILITY_ASC"}
                    onClick={() => handleSortBy("AVAILABILITY_ASC")}
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
                    edit={listing.creator === currentUser.uid}
                    handleInterestedOverlay={handleToggleInterestedOverlay}
                    setInterestedUsers={setInterestedUsers}
                  />
                );
              })}
          </Box>
        )}
      </Grid>

      <Grid item className={classes.item}>
        {detailed >= 0 && filteredListings.length > 0 && (
          <Detail
            id={detailed}
            close={() => setDetailed(-1)}
            info={filteredListings[detailed]}
            height="88vh"
            width="45%"
            position="fixed"
          />
        )}
        <Map
          hidden={detailed >= 0 && filteredListings.length > 0}
          hovered={hovered}
          listings={filteredListings}
          setHovered={setHovered}
          setDetailed={setDetailed}
          height="88vh"
          width="45%"
          position="fixed"
        />
      </Grid>
      <Backdrop className={classes.backdrop} open={openInterestedOverlay}>
        <Paper className={classes.overlay}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: "0.5em" }}
          >
            <Typography variant="h6">Interested</Typography>
            <IconButton onClick={handleCloseInterestedOverlay}>
              <CloseIcon />
            </IconButton>
          </Box>
          {interestedUsers.map((user) => (
            <Profile user={user} popover />
          ))}
        </Paper>
      </Backdrop>
    </Grid>
  );
}

export default Home;
