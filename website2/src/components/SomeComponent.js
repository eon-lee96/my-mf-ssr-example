import React, { useEffect } from "react";
import importedComponent from "react-imported-component";

const AsyncComponent = importedComponent(() => import("./AsyncComponent"));

const SomeComponent = () => {
  useEffect(() => {
    console.log("website2", NAME);
  }, []);
  return (
    <div
      style={{
        padding: "1em",
        margin: "1em",
        border: "1px solid black",
        backgroundColor: "#ccc",
      }}
      onClick={() => alert("website2 is interactive")}
    >
      Header from website2. You can change this and reload localhost:3001 - the
      changes take old on SSR and client side
      <AsyncComponent />
    </div>
  );
};
export default SomeComponent;
