import { Box } from "@material-ui/core";

import GoogleMapReact from "google-map-react";
import MapMarker from "../components/MapMarker";

const pennLocation = {
  lat: 39.9539,
  lng: -75.193,
};

function Map(props) {
  return (
    <Box
      display={props.hidden ? "none" : null}
      style={{
        borderRadius: "1em",
        height: props.height,
        width: props.width,
        overflow: "hidden",
      }}
    >
      <GoogleMapReact
        // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={pennLocation}
        center={props.center}
        defaultZoom={14}
        hoverDistance={25}
        yesIWantToUseGoogleMapApiInternals
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
