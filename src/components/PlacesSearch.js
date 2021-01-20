import React, { useState } from "react";

import { Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ReactDependentScript from "react-dependent-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { makeStyles } from "@material-ui/core/styles";

const GOOGLE_MAPS_API_SCRIPT =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY +
  "&libraries=places";

const useStyles = makeStyles({
  dropdown: {
    backgroundColor: "white",
    height: "20%",
    width: "auto",
    overflow: "scroll",
    position: "absolute",
  },
  dropdownCell: {
    padding: "1em",
  },
});

function PlacesSearch(props) {
  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        props.setlatlnghandler(latLng);
      })
      .catch((error) => console.error("Error", error));
    props.setaddresshandler(address);
  };

  return (
    <ReactDependentScript scripts={[GOOGLE_MAPS_API_SCRIPT]}>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Autocomplete
              options={suggestions}
              freeSolo
              autoHighlight
              getOptionLabel={(suggestion) => suggestion.description}
              renderOption={(suggestion) => (
                <div {...getSuggestionItemProps(suggestion)}>
                  <Typography>{suggestion.description}</Typography>
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...getInputProps({
                    placeholder: "Search Places ...",
                  })}
                  {...params}
                />
              )}
              {...props}
            />

            {/* <OutlinedInput
              value={address}

              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={<>{loading && <CircularProgress size={20} />}</>}
              {...getInputProps({
                placeholder: "Search Places ...",
              })}
              {...props}
            /> */}
            {/* 
            <Paper className={classes.dropdown}>
              {suggestions.map((suggestion) => {
                return (
                  <Box className={classes.dropdownCell}>
                    <div {...getSuggestionItemProps(suggestion)}>
                      <Typography>{suggestion.description}</Typography>
                    </div>
                    <Divider />
                  </Box>
                );
              })}
            </Paper> */}
          </div>
        )}
      </PlacesAutocomplete>
    </ReactDependentScript>
  );
}

export default PlacesSearch;
