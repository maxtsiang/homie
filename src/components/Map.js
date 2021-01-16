import GoogleMapReact from "google-map-react";

function Map() {
  return (
    <div
      style={{
        margin: "3em",
        borderRadius: "3em",
        height: "100vh",
        width: "45em",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDbGKLgDehhTw5e74VYe3jvACTBS9GdrVI" }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33,
        }}
        defaultZoom={11}
      ></GoogleMapReact>
    </div>
  );
}

export default Map;
