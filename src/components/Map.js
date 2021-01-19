import { Box } from "@material-ui/core";

import GoogleMapReact from "google-map-react";
import MapMarker from "../components/MapMarker";

function Map(props) {
  return (
    <Box
      display={props.hidden ? "none" : "block"}
      style={{
        borderRadius: "1em",
        height: props.height,
        width: props.width,
        overflow: "hidden",
        position: props.position,
      }}
    >
      <GoogleMapReact
        // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: 39.9539,
          lng: -75.193,
        }}
        defaultZoom={15}
        hoverDistance={25}
      >
        {props.listings &&
          props.listings.map((listing, index) => {
            return (
              <MapMarker
                hovered={index === props.hovered}
                setHovered={props.setHovered}
                setDetailed={props.setDetailed}
                id={index}
                lat={listing.location.latitude}
                lng={listing.location.longitude}
              />
            );
          })}
      </GoogleMapReact>
    </Box>
  );
}

export default Map;
