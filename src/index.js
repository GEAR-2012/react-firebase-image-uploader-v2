import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "./App";
import { amber, blue } from "@mui/material/colors";
import AppContextProvider from "./state/app-context";
import { BrowserRouter } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: blue,
    secondary: amber,
  },
});

const lightTheme = createTheme({
  components: {
    MuiImageListItemBar: {
      styleOverrides: {
        titleWrap: {
          padding: "4px 10px",
          paddingRight: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 4,
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: blue,
    secondary: amber,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={true ? lightTheme : darkTheme}>
      <CssBaseline />
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
