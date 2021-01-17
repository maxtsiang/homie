import {
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  OutlinedInput,
  Checkbox,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DoneIcon from "@material-ui/icons/Done";

import Counter from "../components/Counter";
import Amenity from "../components/Amenity";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  container: {
    margin: "3em",
    marginTop: "6em",
  },
  label: {
    fontSize: "1.3em",
  },
  input: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
    width: "30em",
  },
  inputField: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
    width: "60em",
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
    width: "30%",
    margin: "1em",
    padding: "0.7em",
    borderRadius: "1em",
    boxShadow: "none",
  },
  group: {
    marginTop: "1em",
    marginRight: "1em",
    width: "30em",
  },
});

function New() {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.container}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3">Create a new listing</Typography>
          <IconButton color="primary">
            <DoneIcon />
          </IconButton>
        </Box>

        <Box display="flex">
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Property Address
            </Typography>
            <FormControl fullWidth className={classes.input} variant="outlined">
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Property Type
            </Typography>
            <FormControl fullWidth className={classes.input} variant="outlined">
              <Select
                value=""
                onChange={() => {
                  console.log("selected");
                }}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                <MenuItem value={10}>Apartment</MenuItem>
                <MenuItem value={20}>Room</MenuItem>
                <MenuItem value={30}>House</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box display="flex">
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Price
            </Typography>

            <FormControl fullWidth className={classes.input} variant="outlined">
              <InputLabel>Amount</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
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
                label="End"
                format="MM/dd/yyyy"
                InputAdornmentProps={{ position: "start" }}
                onChange={() => console.log("HI")}
                className={classes.input}
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex">
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
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => console.log("checked!")}
                        name="wifi"
                      />
                    }
                  />
                  <Amenity id="wifi" />
                </Box>
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => console.log("checked!")}
                        name="wifi"
                      />
                    }
                  />
                  <Amenity id="wifi" />
                </Box>
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => console.log("checked!")}
                        name="wifi"
                      />
                    }
                  />
                  <Amenity id="wifi" />
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        <Box className={classes.group}>
          <Typography variant="h6" className={classes.label}>
            Description
          </Typography>
          <FormControl
            fullWidth
            className={classes.inputField}
            variant="outlined"
          >
            <OutlinedInput multiline />
          </FormControl>
        </Box>

        <Box className={classes.group} display="flex" alignItems="center">
          <Typography variant="h6" className={classes.label}>
            Photos
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Add Photos
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default New;
