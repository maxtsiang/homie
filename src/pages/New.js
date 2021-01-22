import {
  Typography,
  Box,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  OutlinedInput,
  Checkbox,
  GridList,
  GridListTile,
  GridListTileBar,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { useHistory } from "react-router-dom";

import Counter from "../components/Counter";
import Amenity, { amenitiesList } from "../components/Amenity";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import RemoveIcon from "@material-ui/icons/Remove";

import PlacesSearch from "../components/PlacesSearch";

import { storage } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import moment from "moment";

const useStyles = makeStyles({
  container: {
    margin: "3em",
    marginTop: "6em",
    width: "80vw",
    height: "85vh",
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
    width: "10%",
    marginTop: "1em",
    padding: "0.7em",
    borderRadius: "1em",
    boxShadow: "none",
    alignSelf: "flex-end",
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
  gridListWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
    height: "100%",

    width: "100%",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
  },
  titleBar: {
    background: "transparent",
  },
});

function New() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState();
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());
  const [persons, setPersons] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [amenities, setAmenities] = useState({});
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    setError("");
    const fileList = Array.from(e.target.files);
    fileList.forEach((newPhoto) => {
      if (newPhoto.size > 1000000) {
        setError("Image must be less than 1mb");
        return;
      }
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    });
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, photoIndex) => photoIndex !== index));
  };

  function uploadImgs(imgs, id) {
    setError("");

    try {
      for (let i = 0; i < imgs.length; i++) {
        const storageRef = storage.ref(`listing_images/${id}/${imgs[i].name}`);
        const uploadTask = storageRef.put(imgs[i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.getDownloadURL().then((url) => {
              firebase
                .firestore()
                .collection("listings")
                .doc(id)
                .update({
                  images: firebase.firestore.FieldValue.arrayUnion(url),
                });
            });
          }
        );
      }
    } catch (err) {
      setError("Something went wrong uploading the images...");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (!latLng) {
      setError("Please enter a property address");
      setLoading(false);
      return;
    } else if (type === "") {
      setError("Please select a property type");
      setLoading(false);
      return;
    } else if (price <= 0) {
      setError("Please enter a valid price");
      setLoading(false);
      return;
    } else if (description.length === 0) {
      setError("Please enter a description");
      setLoading(false);
      return;
    } else if (photos.length < 3) {
      setError("Please add at least 3 photos");
      setLoading(false);
      return;
    }

    try {
      let selectedAmenities = [];
      for (let amenity in amenities) {
        if (amenities[amenity]) {
          selectedAmenities.push(amenity);
        }
      }

      const ref = await firebase
        .firestore()
        .collection("listings")
        .add({
          location: new firebase.firestore.GeoPoint(latLng.lat, latLng.lng),
          address: address,
          type: type,
          price: Number(price),
          start: Number(start.unix().valueOf() * 1000),
          end: Number(end.unix().valueOf() * 1000),
          persons: Number(persons),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          amenities: selectedAmenities,
          description: description,
          creator: currentUser.uid,
          createdAt: Number(moment().unix().valueOf() * 1000),
          interested: [],
        });

      uploadImgs(photos, ref.id);

      history.push("/");
    } catch (err) {
      setError("Something went wrong!");
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div>
      <Box className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Create a new listing</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Done
            </Button>
          )}
        </Box>

        {error && (
          <Alert className={classes.error} severity="error">
            {error}
          </Alert>
        )}

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Property Address
            </Typography>
            <PlacesSearch
              className={classes.input}
              setaddresshandler={setAddress}
              setlatlnghandler={setLatLng}
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
              <OutlinedInput
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
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

            <FormControl component="fieldset">
              <FormGroup className={classes.checkboxGroup}>
                {amenitiesList.map((amenityName) => {
                  return (
                    <Box display="flex" alignItems="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={amenities ? amenities[amenityName] : false}
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
            Description
          </Typography>
          <FormControl
            fullWidth
            className={classes.inputField}
            variant="outlined"
          >
            <OutlinedInput multiline onChange={handleSetDescription} />
          </FormControl>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group} display="flex" alignItems="center">
            <Button
              className={classes.button}
              variant="contained"
              component="label"
            >
              Add Photos
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/png,image/jpeg"
                multiple
                hidden
              />
            </Button>

            <Box className={classes.gridListWrapper}>
              <GridList cols={3.5} className={classes.gridList}>
                {photos.map((photo, index) => (
                  <GridListTile key={index}>
                    <div>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={photo.name}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                        }}
                      />
                    </div>
                    <GridListTileBar
                      className={classes.titleBar}
                      actionIcon={
                        <IconButton onClick={() => removePhoto(index)}>
                          <RemoveIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default New;
