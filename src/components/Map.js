import { Box } from "@material-ui/core";

import GoogleMapReact from "google-map-react";
import MapMarker from "../components/MapMarker";
// key = AIzaSyDbGKLgDehhTw5e74VYe3jvACTBS9GdrVI
function Map(props) {
  return (
    <Box
      display={props.hidden ? "none" : "block"}
      style={{
        borderRadius: "1em",
        height: props.height,
        width: "100%",
        overflow: "hidden",
        position: props.position,
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{
          lat: 39.9539,
          lng: -75.193,
        }}
        defaultZoom={15}
        hoverDistance={25}
      >
        {props.markers.map((loc) => {
          return (
            <MapMarker
              hovered={loc.id === props.hovered}
              setHovered={props.setHovered}
              setDetailed={props.setDetailed}
              id={loc.id}
              lat={loc.lat}
              lng={loc.lng}
            />
          );
        })}
      </GoogleMapReact>
    </Box>
  );
}

export default Map;
