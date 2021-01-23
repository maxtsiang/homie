import React, { useState } from "react";

import { Typography, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const GOOGLE_MAPS_API_SCRIPT =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY +
  "&libraries=places";

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
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default PlacesSearch;
