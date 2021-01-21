import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import firebase from "../firebase";

const useStyles = makeStyles({
  container: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    borderRadius: "1em",
  },
  label: {
    fontSize: "1.5em",
    margin: "0.5em",
    fontWeight: "700",
  },
  field: {
    width: "80%",
    margin: "0.5em",
  },
  error: {
    width: "70%",
    margin: "1em",
  },
  button: {
    width: "80%",
    marginTop: "1em",
    padding: "0.8em",
    borderRadius: "1em",
    boxShadow: "none",
  },
  subtitle: {
    marginTop: "1em",
  },
  wrapper: {
    display: "flex",
    width: "100vw",
    justifyContent: "space-evenly",
    marginTop: "6em",
  },
});

function Signup(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();

  const history = useHistory();

  const pennDomain = "upenn.edu";

  async function handleSubmit() {
    // if (
    //   /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
    //     emailRef.current.value
    //   ) == false ||
    //   emailRef.current.value.substr(-pennDomain.length) !== pennDomain
    // ) {
    //   return setError("Invalid email address");
    // }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const res = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      await res.user.sendEmailVerification();
      firebase.firestore().collection("users").doc(res.user.uid).set({
        email: res.user.email,
        habits: [],
        chats: [],
      });
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.container} variant="outlined">
        <Typography variant="h3" className={classes.label}>
          Sign Up
        </Typography>

        {error && (
          <Alert className={classes.error} severity="error">
            {error}
          </Alert>
        )}

        <TextField
          className={classes.field}
          label="Email"
          variant="outlined"
          inputRef={emailRef}
        />
        <TextField
          className={classes.field}
          label="Password"
          type="password"
          variant="outlined"
          inputRef={passwordRef}
        />
        <TextField
          className={classes.field}
          label="Confirm Password"
          type="password"
          variant="outlined"
          inputRef={passwordConfirmRef}
        />

        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <Typography variant="subtitle2" className={classes.subtitle}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Log In
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default Signup;
