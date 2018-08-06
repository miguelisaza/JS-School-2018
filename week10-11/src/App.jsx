import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "typeface-roboto";
import { persistor } from "./store";

import MainDrawer from "./components/Drawer/MainDrawer";

class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#232323"
        },
        secondary: {
          main: "#d50000"
        },
        type: "dark"
      }
    });

    return (
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <MainDrawer />
        </MuiThemeProvider>
      </PersistGate>
    );
  }
}

export default App;
