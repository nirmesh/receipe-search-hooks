import React from "react";
import spinner from "../images/spinner.svg";

function Spinner() {
  return (
    <div className="row justify-content-center">
      <img src={spinner} alt="Spinner" className="spinner" />
    </div>
  );
}

export default Spinner;
