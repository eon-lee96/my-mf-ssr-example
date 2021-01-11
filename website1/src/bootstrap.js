import "./imported";
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { rehydrateMarks } from "react-imported-component";
import App from "./components/App";

const render = (App) => {
  if (typeof window !== "undefined") {
    const root = document.getElementById("root");

    rehydrateMarks().then(() => {
      ReactDOM.hydrate(
        <AppContainer>
          <App />
        </AppContainer>,
        root
      );
    });
  }
};

render(App);

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./components/App", () => {
    // eslint-disable-next-line
    const App = require("./components/App").default;

    render(App);
  });
}
