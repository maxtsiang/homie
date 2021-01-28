import {
  Typography,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
  Avatar,
  Badge,
  FormControl,
  Chip,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { storage } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    padding: "2em",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  avatar: {
    height: "15vh",
    width: "15vh",
  },
  input: {
    marginBottom: "1em",
    marginRight: "1em",
    marginTop: "1em",
    width: "100%",
    overflow: "visible",
  },
  button: {
    boxShadow: "none",
    alignSelf: "flex-end",
  },
  group: {
    marginTop: "1em",
    marginRight: "1em",
    width: "100%",
  },
  avatarWrapper: {
    marginTop: "1em",
    marginRight: "1em",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  groupWrapper: {
    display: "flex",
  },
  habit: {
    color: "white",
    padding: "0.5em",
    borderRadius: "0.5em",
    margin: "0.5em",
  },
});

function EditProfile(props) {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const userRef = firebase.firestore().collection("users").doc(currentUser.uid);

  const [name, setName] = useState(currentUser.displayName);
  const [pronouns, setPronouns] = useState("");
  const [major, setMajor] = useState("");
  const [grad, setGrad] = useState(0);
  const [greek, setGreek] = useState("");
  const [habits, setHabits] = useState([]);
  const [myHabits, setMyHabits] = useState([]);
  const [photo, setPhoto] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [changed, setChanged] = useState(false);

  const history = useHistory();

  const handleSetName = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setName(e.target.value);
  };

  const handleSetPronouns = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setPronouns(e.target.value);
  };

  const handleSetGrad = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setGrad(e.target.value);
  };

  const handleSetMajor = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setMajor(e.target.value);
  };

  const handleSetGreek = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setGreek(e.target.value);
  };

  const handleSelectHabit = (id) => {
    if (!changed) {
      setChanged(true);
    }
    const newHabit = habits.find((habit) => {
      return habit.id === id;
    });

    setMyHabits((oldHabits) => [...oldHabits, newHabit]);
  };

  const handleDeleteHabit = (id) => {
    if (!changed) {
      setChanged(true);
    }
    setMyHabits(myHabits.filter((habit) => habit.id !== id));
  };

  useEffect(() => {
    if (!props.new) {
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((snapshot) => {
          const doc = snapshot.data();
          setPronouns(doc.pronouns);
          setMajor(doc.major);
          setGrad(doc.grad);
          setGreek(doc.greek);
          setMyHabits(doc.habits);
        });
    }
  }, [props.new, currentUser.uid]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("habits")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const habit = {
            id: doc.id,
            ...doc.data(),
          };

          setHabits((oldHabits) => [...oldHabits, habit]);
        });
      });
  }, []);

  const handleFileChange = (e) => {
    if (!changed) {
      setChanged(true);
    }
    setError("");
    const fileList = Array.from(e.target.files);
    fileList.forEach((newPhoto) => {
      if (newPhoto.size > 1000000) {
        setError("Image must be less than 1mb");
        return;
      }
      setPhoto(newPhoto);
    });
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

  async function handleSubmit() {
    setError("");
    setMessage("");

    if (!name || !pronouns || !major || !grad) {
      setError("Please fill out everything (greek life optional) :)");
      return;
    } else if (name.length > 20) {
      setError("Please enter a shorter name");
      return;
    } else if (major.length > 20) {
      setError("Please enter a shorter major");
      return;
    } else if (pronouns.length > 20) {
      setError("Please enter shorter pronouns");
      return;
    } else if (greek.length > 20) {
      setError("Please enter a shorter greek");
      return;
    }

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
      habits: myHabits,
    });
    if (photo) {
      uploadImg(photo);
    }

    setLoading(false);
    setMessage("Success!");

    if (props.new) {
      history.push("/");
    }
  }

  return (
    <div>
      <Box className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">
            {props.new ? <>Set Profile</> : <>Edit Profile</>}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!changed}
            >
              Done
            </Button>
          )}
        </Box>

        {error && (
          <Alert className={classes.alert} severity="error">
            {error}
          </Alert>
        )}

        {message && (
          <Alert className={classes.alert} severity="success">
            {message}
          </Alert>
        )}

        <Box className={classes.groupWrapper}>
          <Box className={classes.avatarWrapper}>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <>
                  <IconButton
                    style={{ background: "white", padding: "0.2em" }}
                    component="label"
                  >
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
          <Box className={classes.group}>
            <Typography variant="h6">Name</Typography>

            <OutlinedInput
              onChange={handleSetName}
              defaultValue={currentUser.displayName}
              className={classes.input}
            />
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6">Pronouns</Typography>

            <OutlinedInput
              onChange={handleSetPronouns}
              value={pronouns}
              className={classes.input}
            />
          </Box>

          <Box className={classes.group}>
            <Typography variant="h6">Major</Typography>

            <OutlinedInput
              onChange={handleSetMajor}
              value={major}
              className={classes.input}
            />
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6">Graduation Year</Typography>
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
          <Box className={classes.group}>
            <Typography variant="h6">Greek Life (optional)</Typography>

            <OutlinedInput
              onChange={handleSetGreek}
              className={classes.input}
              value={greek}
            />
          </Box>
        </Box>

        <Box className={classes.groupWrapper}>
          <Box className={classes.group}>
            <Typography variant="h6">My Habits</Typography>

            <Box>
              {myHabits.map((habit) => (
                <Chip
                  key={habit.id}
                  label={habit.name}
                  className={classes.habit}
                  style={{ background: habit.color }}
                  onDelete={() => handleDeleteHabit(habit.id)}
                />
              ))}
            </Box>
          </Box>
          <Box className={classes.group}>
            <Typography variant="h6">All Habits</Typography>

            <Box>
              {habits.map((habit) => (
                <Chip
                  key={habit.id}
                  label={habit.name}
                  className={classes.habit}
                  style={{ background: habit.color }}
                  onClick={() => handleSelectHabit(habit.id)}
                  disabled={
                    myHabits.filter((myHabit) => myHabit.id === habit.id)
                      .length > 0
                  }
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default EditProfile;
