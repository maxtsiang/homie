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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Counter from "../components/Counter";
import Amenity, { amenitiesList } from "../components/Amenity";

import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import RemoveIcon from "@material-ui/icons/Remove";

import PlacesSearch from "../components/PlacesSearch";

import { storage } from "../firebase";

const useStyles = makeStyles({
  container: {
    margin: "3em",
    marginTop: "6em",
    width: "80vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  checkbox: {
    marginRight: 0,
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  checkboxWrapper: {
    flex: "1 0 34%",
  },
  label: {
    fontSize: "1.3em",
  },
  input: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
    width: "100%",
    overflow: "visible",
  },
  inputField: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
    width: "100%",
  },
  separator: {
    fontSize: "1.3em",
    marginRight: "1em",
  },
  subtitle: {
    fontSize: "1em",
    fontWeight: 400,
  },
  button: {
    width: "20%",
    marginTop: "1em",
    padding: "0.7em",
    borderRadius: "1em",
    boxShadow: "none",
    alignSelf: "center",
  },
  group: {
    marginTop: "1em",
    marginRight: "1em",
    width: "100%",
  },
  fieldGroup: {
    marginTop: "1em",
    marginRight: "1em",
    width: "100%",
  },
  groupWrapper: {
    display: "flex",
  },
});

function New() {
  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [persons, setPersons] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [amenities, setAmenities] = useState();
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSetPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleCheck = (e) => {
    setAmenities({ ...amenities, [e.target.name]: e.target.checked });
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    fileList.map((newPhoto) =>
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto])
    );
  };

  return (
    <div>
      <Box className={classes.container}>
        <Typography variant="h3">Create a new listing</Typography>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Property Address
            </Typography>
            <PlacesSearch
              className={classes.input}
              setAddressHandler={setAddress}
              setLatLngHandler={setLatLng}
            />
          </Box>

          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Property Type
            </Typography>
            <FormControl fullWidth className={classes.input} variant="outlined">
              <Select value={type} onChange={handleSetType} displayEmpty>
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Room">Room</MenuItem>
                <MenuItem value="House">House</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
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
                onChange={handleSetPrice}
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
                format="MM/DD/YYYY"
                InputAdornmentProps={{ position: "start" }}
                value={start}
                minDate={new Date()}
                onChange={(date) => setStart(date)}
                className={classes.input}
                fullWidth
              />
              <RemoveIcon className={classes.separator} />
              <KeyboardDatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="End"
                format="MM/DD/YYYY"
                InputAdornmentProps={{ position: "start" }}
                value={end}
                minDate={new Date()}
                onChange={(date) => setEnd(date)}
                className={classes.input}
                fullWidth
              />
            </Box>
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Rooms and Beds
            </Typography>
            <Counter label="Persons" setCountHandler={setPersons} />
            <Counter label="Bedroom" setCountHandler={setBedrooms} />
            <Counter label="Bathroom" setCountHandler={setBathrooms} />
          </Box>

          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Amenities
            </Typography>

            <FormControl>
              <FormGroup className={classes.checkboxGroup}>
                {amenitiesList.map((amenityName) => {
                  return (
                    <Box
                      display="flex"
                      alignItems="center"
                      className={classes.checkboxWrapper}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={amenities && amenities[amenityName]}
                            onChange={handleCheck}
                            name={amenityName}
                          />
                        }
                        className={classes.checkbox}
                      />
                      <Amenity id={amenityName} />
                    </Box>
                  );
                })}
              </FormGroup>
            </FormControl>
          </Box>
        </Box>

        <Box className={classes.fieldGroup}>
          <Typography variant="h6" className={classes.label}>
            Description ({description.length}/300 characters)
          </Typography>
          <FormControl
            fullWidth
            className={classes.inputField}
            variant="outlined"
          >
            <OutlinedInput
              multiline
              style={{ paddingBottom: "5em" }}
              onChange={handleSetDescription}
            />
          </FormControl>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group} display="flex" alignItems="center">
            <Typography variant="h6" className={classes.label}>
              Photos
            </Typography>
            <IconButton color="primary" component="label">
              <AddCircleOutlineIcon />
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/png,image/jpeg"
                multiple
                hidden
              />
            </IconButton>
          </Box>
          {/* display images here */}
        </Box>

        <Button className={classes.button} variant="contained" color="primary">
          Done
        </Button>
      </Box>
    </div>
  );
}

export default New;
