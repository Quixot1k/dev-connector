import React, { Fragment } from "react";
import loading from "./loading.gif";

function Loading() {
  return (
    <Fragment>
      <img
        src={loading}
        style={{
          width: "200px",
          position: "absolute",
          top: "40%",
          left: "42.5%",
          //   display: "block",
        }}
        alt="Loading..."
      />
    </Fragment>
  );
}
export default Loading;
