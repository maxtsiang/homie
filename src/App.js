import Home from "./pages/Home";
import New from "./pages/New";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Verify from "./pages/Verify";

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
  typography: {
    fontFamily: '"Roboto"',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
      color: "grey",
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
