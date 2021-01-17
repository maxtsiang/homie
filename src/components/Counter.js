import { Box, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles({
  counterBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counter: {
    display: "flex",
    alignItems: "center",
  },
});

function Counter(props) {
  const classes = useStyles();

  return (
    <Box className={classes.counterBox}>
      <Typography variant="subtitle1">{props.label}</Typography>
      <Box className={classes.counter}>
        <IconButton>
          <RemoveIcon />
        </IconButton>
        <Typography variant="subtitle1">1</Typography>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Counter;
