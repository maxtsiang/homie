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
  CircularProgress,
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
  container: {
    display: "flex",
    justify: "space-between",
    alignItems: "center",
    height: "90vh",
  },
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
    overflow: "scroll",
    height: "100%",
    padding: "2em",
  },
}));

const SORT_OPTIONS = {
  PRICE_ASC: { name: "Most Cheap", column: "price", direction: "asc" },
  AVAILABILITY_ASC: {
    name: "Earliest Available",
    column: "start",
    direction: "asc",
  },
  CREATEDAT_DESC: {
    name: "Most Recent",
    column: "createdAt",
    direction: "desc",
  },
};

const LIMIT = 10;

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

  const [listings, setListings] = useState([]);
  const [lastListing, setLastListing] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("listings")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .limit(LIMIT)
      .onSnapshot((snapshot) => {
        const newListings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsEnd(false);
        setListings(newListings);
        setLastListing(snapshot.docs[snapshot.docs.length - 1]);
      });

    return () => unsubscribe();
  }, [sortBy]);

  function getListings() {
    setLoading(true);
    firebase
      .firestore()
      .collection("listings")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .startAfter(lastListing)
      .limit(LIMIT)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          const newListings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setListings((oldListings) => [...oldListings, ...newListings]);
          setLastListing(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          setIsEnd(true);
        }

        setLoading(false);
      });
  }

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

  const handleScroll = (e) => {
    const triggerHeight = e.target.scrollTop + e.target.offsetHeight;
    if (triggerHeight >= e.target.scrollHeight) {
      if (!loading && !isEnd) {
        getListings();
      }
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.item} onScroll={handleScroll} xs>
        <Box className={classes.header}>
          {filterMode ? (
            <Typography variant="h3">Filter</Typography>
          ) : (
            <Box display="flex" alignItems="center">
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
              {filteredListings.length} places near University of Pennsylvania
            </Typography>
            {!filterMode && (
              <>
                <Button onClick={handleOpenSortBy}>Sort By</Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {Object.keys(SORT_OPTIONS).map((key, index) => (
                    <MenuItem
                      key={index}
                      selected={sortBy === key}
                      onClick={() => handleSortBy(key)}
                    >
                      {SORT_OPTIONS[key].name}
                    </MenuItem>
                  ))}
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
                    key={listing.id}
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
            {loading && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress size={30} />
              </Box>
            )}
            {isEnd && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="subtitle2">No more listings</Typography>
              </Box>
            )}
          </Box>
        )}
      </Grid>

      <Grid item className={classes.item} xs>
        {filteredListings[detailed] && (
          <Detail
            id={detailed}
            close={() => setDetailed(-1)}
            info={filteredListings[detailed]}
            height="88vh"
            width="45%"
          />
        )}
        <Map
          hidden={detailed >= 0 && filteredListings.length > 0}
          hovered={hovered}
          listings={filteredListings}
          setHovered={setHovered}
          setDetailed={setDetailed}
          height="87vh"
          width="100%"
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
            <Profile key={user.id} user={user} popover />
          ))}
        </Paper>
      </Backdrop>
    </Grid>
  );
}

export default Home;
