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

function Login(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();

  const history = useHistory();

  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.container} variant="outlined">
        <Typography variant="h3" className={classes.label}>
          Login
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
          <Link component={RouterLink} to="/forgot">
            Forgot Password
          </Link>
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle}>
          Need an account?{" "}
          <Link component={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default Login;
