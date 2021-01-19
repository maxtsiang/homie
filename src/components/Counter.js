import { useState } from "react";
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

  const [count, setCount] = useState(props.count ? props.count : 1);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    props.setCountHandler(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    props.setCountHandler(newCount);
  };

  return (
    <Box className={classes.counterBox}>
      <Typography variant="subtitle1">{props.label}</Typography>
      <Box className={classes.counter}>
        <IconButton onClick={decrement} disabled={count === 1}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="subtitle1">{count}</Typography>
        <IconButton onClick={increment}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Counter;
