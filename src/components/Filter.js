import {
  Box,
  Typography,
  Button,
  TextField,
  Input,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";

import Counter from "../components/Counter";

const useStyles = makeStyles({
  container: {
    width: "49.3em",
  },
  label: {
    fontSize: "1.3em",
  },
  input: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
  },
  separator: {
    fontSize: "1.3em",
    margin: "1em",
    marginRight: "2em",
  },
  subtitle: {
    fontSize: "1em",
    fontWeight: 400,
  },
  button: {
    width: "100%",
    marginTop: "1em",
    padding: "0.7em",
    borderRadius: "1em",
  },
  group: {
    marginBottom: "1em",
  },
});

function Filter(props) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.group}>
        <Typography variant="h6" className={classes.label}>
          Price
        </Typography>
        <Box display="flex" alignItems="center">
          <FormControl fullWidth className={classes.input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Minimum</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <Typography variant="h6" className={classes.separator}>
            -
          </Typography>
          <FormControl fullWidth className={classes.input} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Maximum</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
        </Box>
      </Box>

      <Box className={classes.group}>
        <Typography variant="h6" className={classes.label}>
          Availability
        </Typography>

        <Box display="flex" alignItems="center">
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Start"
            format="MM/dd/yyyy"
            InputAdornmentProps={{ position: "start" }}
            onChange={() => console.log("HI")}
            className={classes.input}
          />
          <Typography variant="h6" className={classes.separator}>
            -
          </Typography>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Start"
            format="MM/dd/yyyy"
            InputAdornmentProps={{ position: "start" }}
            onChange={() => console.log("HI")}
            className={classes.input}
          />
        </Box>
      </Box>

      <Box className={classes.group}>
        <Typography variant="h6" className={classes.label}>
          Rooms and Beds
        </Typography>
        <Counter label="Persons" />
        <Counter label="Bedroom" />
        <Counter label="Bathroom" />
      </Box>

      <Box className={classes.group}>
        <Typography variant="h6" className={classes.label}>
          Amenities
        </Typography>

        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  onChange={() => console.log("checked!")}
                  name="wifi"
                />
              }
              label="Wifi"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  onChange={() => console.log("checked!")}
                  name="wifi"
                />
              }
              label="Wifi"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  onChange={() => console.log("checked!")}
                  name="wifi"
                />
              }
              label="Wifi"
            />
          </FormGroup>
        </FormControl>
      </Box>

      <Box>
        <Button variant="contained" color="primary" className={classes.button}>
          Done
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => props.cancel()}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default Filter;
