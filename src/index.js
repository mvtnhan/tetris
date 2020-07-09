import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./App";

const GlobalStyle = createGlobalStyle`
${normalize}
  body {
    margin: 0;
    font-family: "VT323", Arial, Helvetica, sans-serif;
  }

`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
