import Home from "./pages/Home";
import New from "./pages/New";
import Chat from "./pages/Chat";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import EditProfile from "./pages/EditProfile";

import { BrowserRouter, Route } from "react-router-dom";
import "fontsource-roboto";
import PrivateRoute from "./components/PrivateRoute";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  responsiveFontSizes,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { AuthProvider } from "./contexts/AuthContext";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#60BEEB",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto"',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
      color: "lightgrey",
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      color: "grey",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "1em",
        padding: "0.75em",
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BrowserRouter>
            <PrivateRoute exact path="/" component={() => <Home />} />
            <PrivateRoute exact path="/new" component={() => <New />} />
            <PrivateRoute exact path="/chats" component={() => <Chat />} />
            <PrivateRoute
              exact
              path="/saved"
              component={() => <Home saved />}
            />
            <PrivateRoute
              exact
              path="/editprofile"
              component={() => <EditProfile />}
            />
            <Route exact path="/signup" component={() => <Signup />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/forgot" component={() => <Forgot />} />
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
