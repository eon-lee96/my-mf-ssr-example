import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import * as path from "path";
import {
  whenComponentsReady,
  printDrainHydrateMarks,
  ImportedStream,
} from "react-imported-component";
import { createLoadableStream } from "react-imported-component/server";
import { importAssets } from "webpack-imported";
import {
  discoverProjectStyles,
  getUsedStyles,
  getCriticalStyles,
} from "used-styles";
import mockConfig from "../src/mockConfig";
import { nodeLoadRemote } from "../src/util/loadRemote";

import "../src/imported";
import App from "../src/components/App";

let stylesLookup = discoverProjectStyles(
  path.resolve(__dirname, "../buildClient/static/")
);

const importedStat = require("../buildClient/static/imported.json");

export default async (req, res, next) => {
  try {
    const streamId = createLoadableStream();
    const RemoteModule = await nodeLoadRemote(mockConfig.website2);
    await whenComponentsReady();

    const jsx = createApp(App, streamId, RemoteModule);

    await stylesLookup;
    // Render your application
    const html = renderToString(jsx) + printDrainHydrateMarks(streamId);

    const usedStyles = getUsedStyles(html, stylesLookup);

    const relatedAssets = importAssets(importedStat, ["main"]);

    const helmet = Helmet.renderStatic();

    return res.send(`<!doctype html>
     <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link rel="shortcut icon" href="data:;base64,=">
            ${usedStyles.map((style) => {
              return `<link rel='stylesheet' href="${importedStat.config.publicPath}${style}" >`;
            })}
        </head>

        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${html}</div>
          ${relatedAssets.scripts.load
            .map((script) => {
              return `<script defer src="${importedStat.config.publicPath}${script}" ></script>`;
            })
            .join("\n")}
        </body>
      </html>`);
  } catch (err) {
    console.error(err);
  }
};

const createApp = (App, streamId, RemoteModule) => (
  <ImportedStream stream={streamId}>
    <App RemoteModule={RemoteModule.default} />
  </ImportedStream>
);
