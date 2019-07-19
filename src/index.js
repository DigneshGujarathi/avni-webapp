import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { cognitoInDev, isProdEnv } from "./common/constants";
import { App, SecureApp } from "./app";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import * as Colors from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: Colors.blue,
    secondary: Colors.grey
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        {isProdEnv || cognitoInDev ? <SecureApp /> : <App />}
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
