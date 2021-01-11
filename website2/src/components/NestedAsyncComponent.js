import React from "react";

const NestedAsyncComponent = () => {
  return (
    <h2 onClick={() => console.log("i am NestedAsyncComponent from website2")}>
      NestedAsyncComponent from website2
    </h2>
  );
};

export default NestedAsyncComponent;
