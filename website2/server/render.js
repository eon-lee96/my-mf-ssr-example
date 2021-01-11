import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import path from "path";
import {
  whenComponentsReady,
  printDrainHydrateMarks,
  ImportedStream,
} from "react-imported-component";
import App from "../src/components/App";

export default async (req, res, next) => {
  try {
    await whenComponentsReady();
    const jsx = createApp(App);

    const html = renderToString(jsx);
    const helmet = Helmet.renderStatic();

    return res.send(`<!doctype html>
     <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}

            <link rel="shortcut icon" href="data:;base64,=">
        </head>

        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${html}</div>
        </body>
      </html>`);
  } catch (err) {
    console.error(err);
  }
};

const createApp = (App) => <App />;
