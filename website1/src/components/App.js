import React from "react";
import importedComponent from "react-imported-component";

const AsyncSharedComponent = importedComponent(() =>
  import("website2/SomeComponent")
);

const AsyncWebsite1 = importedComponent(() => import("./AsyncApp"));

export default () => {
  return (
    <div>
      <h1 onClick={() => alert("website1 is interactive")}>
        This is website 1
      </h1>
      <AsyncSharedComponent />
      <AsyncWebsite1 />
    </div>
  );
};
