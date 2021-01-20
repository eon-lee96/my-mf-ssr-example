import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";
import importedComponent from "react-imported-component";

const AsyncWebsite1 = importedComponent(() => import("./AsyncApp"));

export default ({ RemoteModule }) => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
    console.log("website1:", NAME);
  }, []);

  return (
    <div>
      <h1 onClick={() => alert("website1 is interactive")}>
        This is website 1
      </h1>
      <RemoteModule />

      <AsyncWebsite1 />
    </div>
  );
};
