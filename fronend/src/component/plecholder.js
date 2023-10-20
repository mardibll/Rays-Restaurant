import React from "react";

export default function Plecholder() {
  return (
    <div aria-hidden="true" className="card h-100 ">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGwExbvCAV5wmfTFnfUHr_J72qjaPP4fI3uw&usqp=CAU"
        className="card-img-top"
        style={{ height: 180 }}
        alt="error"
      />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-10"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-9"></span>
          <span className="placeholder col-8"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-7"></span>
        </p>

        <a
          className="btn btn-primary disabled placeholder col-12 "
          aria-disabled="true"
        ></a>
      </div>
    </div>
  );
}
