import {
  Typography,
  Divider,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Box,
} from "@material-ui/core";

import bedroom from "../dev-imgs/bedroom.jpg";
import profile from "../dev-imgs/profile.jpg";

import Profile from "./Profile";
import Interested from "./Interested";

function Listing() {
  return (
    <div style={{ padding: "0.3em" }}>
      <Card>
        <CardActionArea
          style={{
            display: "flex",
          }}
        >
          <CardMedia
            image={bedroom}
            title="bedroom-pic"
            component="img"
            style={{ width: "35em", padding: "2em", borderRadius: "3em" }}
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
              <Button>Interested</Button>
              <Button>Share</Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Listing;
