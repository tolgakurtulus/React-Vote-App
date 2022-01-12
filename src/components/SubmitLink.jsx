import React from "react";
import { Link } from "react-router-dom";

const ReturnForm = () => {
  return (
    <Link to={`/React-Vote-App/form`}>
      <a className="container mb-5 mt-5">
        <div className="box row">
          <div className="box-left col-4">
            <h2>
              <i className="fas fa-plus"></i>
            </h2>
          </div>
          <div className="box-right col-8">
            <h2>SUBMIT A LINK</h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ReturnForm;
