import {
  Typography,
  Button,
  Paper,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  container: {
    marginTop: "-10em",
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
  alert: {
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
    alignItems: "center",
    width: "100vw",
    justifyContent: "space-evenly",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
  },
});

function Verify(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  async function verifyEmail() {
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await currentUser.sendEmailVerification();
      setMessage("Email sent!");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.container} variant="outlined">
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Typography variant="h3" className={classes.label}>
          Verify your email
        </Typography>

        <Typography variant="subtitle1">
          Please check your inbox for further instructions.
        </Typography>

        {loading ? (
          <CircularProgress size={30} />
        ) : (
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={verifyEmail}
          >
            Resend Email
          </Button>
        )}
        <Typography variant="subtitle2" className={classes.subtitle}>
          <Link component={RouterLink} to="/login">
            Back to login
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default Verify;
