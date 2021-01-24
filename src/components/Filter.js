import {
  Box,
  Typography,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { KeyboardDatePicker } from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";

import Counter from "../components/Counter";

import RemoveIcon from "@material-ui/icons/Remove";
import { useState } from "react";

import moment from "moment";

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  checkbox: {
    margin: 0,
  },
  input: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
  },
  separator: {
    marginRight: "1em",
  },
  button: {
    width: "100%",
    marginTop: "1em",
    padding: "0.7em",
    borderRadius: "1em",
    boxShadow: "none",
  },
  group: {
    marginBottom: "1em",
  },
});

function Filter(props) {
  const classes = useStyles();

  const [min, setMin] = useState(props.filters.min);
  const [max, setMax] = useState(props.filters.max);
  const [start, setStart] = useState(
    props.filters.start ? moment(props.filters.start) : null
  );
  const [end, setEnd] = useState(
    props.filters.end ? moment(props.filters.end) : null
  );
  const [persons, setPersons] = useState(props.filters.persons);
  const [bedrooms, setBedrooms] = useState(props.filters.bedrooms);
  const [bathrooms, setBathrooms] = useState(props.filters.bathrooms);

  const [error, setError] = useState("");

  const handleSetMin = (e) => {
    setMin(e.target.value);
  };

  const handleSetMax = (e) => {
    setMax(e.target.value);
  };

  const handleSetFilters = (e) => {
    if (min) {
      if (min < 0) {
        setError("Minimum amount must be at least 0");
        return;
      } else if (max && min > max) {
        setError("Minimum amount cannot be greater than maximum amount");
        return;
      }
      props.addFilter("min", Number(min));
    }

    if (max) {
      if (max < 0) {
        setError("Maximum amount must be at least 0");
        return;
      }
      props.addFilter("max", max);
    }

    if (start) {
      props.addFilter("start", start.unix().valueOf() * 1000);
    }

    if (end) {
      props.addFilter("end", end.unix().valueOf() * 1000);
    }

    if (persons) {
      props.addFilter("persons", persons);
    }

    if (bedrooms) {
      props.addFilter("bedrooms", bedrooms);
    }

    if (bathrooms) {
      props.addFilter("bathrooms", bathrooms);
    }

    props.close();
  };

  const handleClearFilters = (e) => {
    props.clearFilters();
    props.close();
  };

  return (
    <Box className={classes.container}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box className={classes.group}>
        <Typography variant="h6">Price</Typography>
        <Box display="flex" alignItems="center">
          <FormControl fullWidth className={classes.input} variant="outlined">
            <InputLabel>Min</InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Min"
              value={min}
              onChange={handleSetMin}
            />
          </FormControl>

          <RemoveIcon className={classes.separator} />

          <FormControl fullWidth className={classes.input} variant="outlined">
            <InputLabel>Max</InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={max}
              label="Max"
              onChange={handleSetMax}
            />
          </FormControl>
        </Box>
      </Box>

      <Box className={classes.group}>
        <Typography variant="h6">Availability</Typography>

        <Box display="flex" alignItems="center">
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Start"
            format="MM/DD/YYYY"
            InputAdornmentProps={{ position: "start" }}
            fullWidth
            value={start}
            minDate={new Date()}
            onChange={(date) => setStart(date)}
            className={classes.input}
          />

          <RemoveIcon className={classes.separator} />

          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="End"
            format="MM/DD/YYYY"
            InputAdornmentProps={{ position: "start" }}
            fullWidth
            value={end}
            minDate={new Date()}
            onChange={(date) => setEnd(date)}
            className={classes.input}
          />
        </Box>
      </Box>

      <Box className={classes.group}>
        <Typography variant="h6">Rooms and Beds</Typography>
        <Counter label="Persons" setCountHandler={setPersons} count={persons} />
        <Counter
          label="Bedroom"
          setCountHandler={setBedrooms}
          count={bedrooms}
        />
        <Counter
          label="Bathroom"
          setCountHandler={setBathrooms}
          count={bathrooms}
        />
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSetFilters}
        >
          Done
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          disabled={Object.keys(props.filters).length === 0}
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
}

export default Filter;
