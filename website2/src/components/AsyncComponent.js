import React from "react";
import importedComponent from "react-imported-component";

const NestedAsyncComponent = importedComponent(() =>
  import("./NestedAsyncComponent")
);

const AsyncComponent = () => {
  return (
    <>
      <h2 onClick={() => console.log("i am asyncComponent from website2")}>
        AsyncComponent from website2
      </h2>
      <NestedAsyncComponent />
    </>
  );
};

export default AsyncComponent;
