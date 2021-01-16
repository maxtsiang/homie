import Listing from "../components/Listing";
import Map from "../components/Map";
import { Typography, Grid } from "@material-ui/core";

function Home() {
  return (
    <div>
      <Grid container display="flex">
        <Grid item style={{ padding: "3em" }}>
          <Typography variant="h3" style={{ margin: "0.25em" }}>
            Find a place
          </Typography>
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
