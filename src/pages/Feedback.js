import {
  Typography,
  Box,
  Button,
  OutlinedInput,
  CircularProgress,
  FormControl,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    padding: "2em",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  button: {
    alignSelf: "flex-end",
  },
  group: {
    marginTop: "1em",
    marginRight: "1em",
    width: "100%",
  },
});

function EditProfile(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  function onChangeText(e) {
    setText(e.target.value);
  }

  function handleSubmit() {
    if (text === "") {
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    firebase
      .firestore()
      .collection("feedback")
      .add({
        content: text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setText("");
        setLoading(false);
        setMessage("Sent! Thank you :)");
      })
      .catch(() => {
        setLoading(false);
        setError("Uh oh, something went wrong.");
      });
  }

  return (
    <div>
      <Box className={classes.container}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Send feedback</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Send!
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

        <Box className={classes.group}>
          <Typography variant="subtitle2">
            Please send us any kind of feedback or suggestion - it's anonymous!
          </Typography>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput multiline onChange={onChangeText} value={text} />
          </FormControl>
        </Box>
      </Box>
    </div>
  );
}

export default EditProfile;
