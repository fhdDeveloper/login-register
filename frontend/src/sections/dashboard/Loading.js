import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="align-items-center d-flex justify-content-center" style={{
      height: "calc(100vh - 150px)"
    }}>
      <Spinner animation={"grow"} variant={"primary"} />
    </div>
  );
};

export default Loading;