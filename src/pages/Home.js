import Listing from "../components/Listing";
import Map from "../components/Map";
import { Typography, Grid, Box, Button, IconButton } from "@material-ui/core";

import FilterListIcon from "@material-ui/icons/FilterList";

function Home() {
  return (
    <div>
      <Grid container display="flex">
        <Grid item style={{ padding: "3em" }}>
          <Box display="flex">
            <Typography variant="h3">Find a place</Typography>
            <IconButton color="primary" aria-label="filter">
              <FilterListIcon />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">
              23 places found near University of Pennsylvania
            </Typography>
            <Button>Sort By</Button>
          </Box>
          {[1, 2, 3].map(() => {
            return <Listing />;
          })}
        </Grid>
        <Grid item>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
