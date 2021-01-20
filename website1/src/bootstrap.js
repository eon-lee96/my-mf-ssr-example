import "./imported";
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { rehydrateMarks } from "react-imported-component";
import App from "./components/App";
import mockConfig from "./mockConfig";
import { browserLoadRemote } from "./util/loadRemote";

const render = async (App) => {
  if (typeof window !== "undefined") {
    const root = document.getElementById("root");
    const remoteModule = await browserLoadRemote(mockConfig.website2);

    rehydrateMarks().then(() => {
      ReactDOM.hydrate(
        <AppContainer>
          <App RemoteModule={remoteModule.default} />
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
