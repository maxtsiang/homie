import Home from "./pages/Home";
import New from "./pages/New";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import "fontsource-roboto";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  responsiveFontSizes,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

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
