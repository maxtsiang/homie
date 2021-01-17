import GoogleMapReact from "google-map-react";
import MapMarker from "../components/MapMarker";
// key = AIzaSyDbGKLgDehhTw5e74VYe3jvACTBS9GdrVI
function Map(props) {
  return (
    <div
      style={{
        borderRadius: "1em",
        height: "88vh",
        width: "45em",
        overflow: "hidden",
        position: "fixed",
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
              id={loc.id}
              lat={loc.lat}
              lng={loc.lng}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
