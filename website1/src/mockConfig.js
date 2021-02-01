import path from "path";

export async function getRemoteConfig() {
  return {
    website2: {
      url: "http://localhost:3002/static/container.js",
      scope: "website2",
      module: "./SomeComponent",
      file: path.join(__dirname, "../../website2/buildServer/container.js"),
    },
  };
}
