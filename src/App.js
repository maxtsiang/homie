import Home from "./pages/Home";
import New from "./pages/New";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import "fontsource-roboto";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5em",
      color: "grey",
    },
    h6: {
      fontSize: "2.5em",
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
          <Nav />
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/new" component={() => <New />} />
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
