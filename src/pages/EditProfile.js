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
  GridList,
  GridListTile,
  GridListTileBar,
  CircularProgress,
  Avatar,
  Badge,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { useHistory } from "react-router-dom";

import Counter from "../components/Counter";
import Amenity, { amenitiesList } from "../components/Amenity";

import React, { useState, useRef, Image, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import RemoveIcon from "@material-ui/icons/Remove";

import PlacesSearch from "../components/PlacesSearch";

import { storage } from "../firebase";
import { Remove } from "@material-ui/icons";

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
  avatar: {
    height: "15vh",
    width: "15vh",
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

function EditProfile() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const history = useHistory();

  const userRef = firebase.firestore().collection("users").doc(currentUser.uid);

  const [name, setName] = useState(currentUser.displayName);
  const [pronouns, setPronouns] = useState("");
  const [major, setMajor] = useState("");
  const [grad, setGrad] = useState(0);
  const [greek, setGreek] = useState("");
  const [habits, setHabits] = useState([]);
  const [photo, setPhoto] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetPronouns = (e) => {
    setPronouns(e.target.value);
  };

  const handleSetGrad = (e) => {
    setGrad(e.target.value);
  };

  const handleSetMajor = (e) => {
    setMajor(e.target.value);
  };

  const handleSetGreek = (e) => {
    setGreek(e.target.value);
  };

  useEffect(() => {
    userRef.get().then((snapshot) => {
      const doc = snapshot.data();
      setPronouns(doc.pronouns);
      setMajor(doc.major);
      setGrad(doc.grad);
      setGreek(doc.greek);
    });
  }, []);

  const handleFileChange = (e) => {
    setError("");
    const fileList = Array.from(e.target.files);
    fileList.map((newPhoto) => {
      if (newPhoto.size > 1000000) {
        setError("Image must be less than 1mb");
        return;
      }
      setPhoto(newPhoto);
    });
  };

  const removePhoto = () => {
    setPhoto();
  };

  function uploadImg(img) {
    try {
      const storageRef = storage.ref(
        `users_profile/${currentUser.uid}/${img.name}`
      );
      const uploadTask = storageRef.put(img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storageRef.getDownloadURL().then((url) => {
            currentUser
              .updateProfile({
                photoURL: url,
              })
              .then(
                () => {},
                (error) => {
                  console.log(error);
                }
              );

            userRef
              .update({
                profile: url,
              })
              .then(
                () => {},
                (error) => {
                  console.log(error);
                }
              );
          });
        }
      );
    } catch (err) {
      console.log(err);
      setError("Something went wrong uploading the images...");
    }
  }

  //   async function handleSubmit(e) {
  //     e.preventDefault();

  //     setError("");
  //     setLoading(true);

  //     if (!latLng) {
  //       setError("Please enter a property address");
  //       setLoading(false);
  //       return;
  //     } else if (type === "") {
  //       setError("Please select a property type");
  //       setLoading(false);
  //       return;
  //     } else if (price <= 0) {
  //       setError("Please enter a valid price");
  //       setLoading(false);
  //       return;
  //     } else if (description.length == 0) {
  //       setError("Please enter a description");
  //       setLoading(false);
  //       return;
  //     } else if (photos.length < 3) {
  //       setError("Please add at least 3 photos");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       let selectedAmenities = [];
  //       for (let amenity in amenities) {
  //         if (amenities[amenity]) {
  //           selectedAmenities.push(amenity);
  //         }
  //       }

  //       const ref = await firebase
  //         .firestore()
  //         .collection("listings")
  //         .add({
  //           location: new firebase.firestore.GeoPoint(latLng.lat, latLng.lng),
  //           address: address,
  //           type: type,
  //           price: Number(price),
  //           start: Number(start.unix().valueOf() * 1000),
  //           end: Number(end.unix().valueOf() * 1000),
  //           persons: Number(persons),
  //           bedrooms: Number(bedrooms),
  //           bathrooms: Number(bathrooms),
  //           amenities: selectedAmenities,
  //           description: description,
  //           creator: currentUser.uid,
  //           createdAt: Number(moment().unix().valueOf() * 1000),
  //         });

  //       uploadImgs(photos, ref.id);

  //       history.push("/");
  //     } catch (err) {
  //       setError("Something went wrong!");
  //       console.log(err);
  //     }
  //     setLoading(false);
  //   }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    await currentUser.updateProfile({
      displayName: name,
    });
    await userRef.update({
      name,
      pronouns,
      major,
      grad,
      greek,
    });
    if (photo) {
      uploadImg(photo);
    }

    setLoading(false);
  }

  return (
    <div>
      <Box className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Edit Profile</Typography>
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
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <>
                  <IconButton component="label">
                    <PhotoCameraIcon />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/png,image/jpeg"
                      hidden
                    />
                  </IconButton>
                </>
              }
            >
              <Avatar
                alt={currentUser.displayName}
                src={photo ? URL.createObjectURL(photo) : currentUser.photoURL}
                className={classes.avatar}
              />
            </Badge>
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Name
            </Typography>

            <OutlinedInput
              onChange={handleSetName}
              defaultValue={currentUser.displayName}
              className={classes.input}
            />
          </Box>

          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Pronouns
            </Typography>

            <OutlinedInput
              onChange={handleSetPronouns}
              value={pronouns}
              className={classes.input}
            />
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Major
            </Typography>

            <OutlinedInput
              onChange={handleSetMajor}
              value={major}
              className={classes.input}
            />
          </Box>

          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Graduation Year
            </Typography>
            <FormControl fullWidth className={classes.input} variant="outlined">
              <Select value={grad} onChange={handleSetGrad} displayEmpty>
                <MenuItem value={0} disabled>
                  <em>Select one</em>
                </MenuItem>
                {[...Array(6)].map((n, i) => (
                  <MenuItem value={2020 + i}>{2020 + i}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Greek Life
            </Typography>

            <OutlinedInput
              onChange={handleSetGreek}
              className={classes.input}
              value={greek}
            />
          </Box>

          {/* <Box className={classes.group}>
            <Typography variant="h6" className={classes.label}>
              Habits
            </Typography>

            <FormControl fullWidth className={classes.input} variant="outlined">
              <OutlinedInput />
            </FormControl>
          </Box> */}
        </Box>

        {/* <Box className={classes.groupWrapper}>
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
        </Box> */}
      </Box>
    </div>
  );
}

export default EditProfile;
