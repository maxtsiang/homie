import { Button } from "@material-ui/core";

function MapMarker(props) {
  return (
    <Button
      color="primary"
      variant="contained"
      onMouseEnter={() => props.setHovered && props.setHovered(props.id)}
      onMouseLeave={() => props.setHovered && props.setHovered(-1)}
      onClick={() => props.setDetailed && props.setDetailed(props.id)}
      style={{
        transform: "translate(-50%, -100%)",
        padding: "0.2em",
        background: props.hovered || props.$hovered ? "#779ecb" : null,
        "&:hover": {
          background: "#779ecb",
        },
      }}
    >
      ${props.price}
    </Button>
  );
}

export default MapMarker;
