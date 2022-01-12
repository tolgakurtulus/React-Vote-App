import React from "react";
import { Link } from "react-router-dom";

const SubmitLink = () => {
  return (
    <Link to={`/React-Vote-App`}>
      <span className="container mb-5 mt-5 text-light">
        <h6>← Return to List</h6>
      </span>
    </Link>

  );
};

export default SubmitLink;
