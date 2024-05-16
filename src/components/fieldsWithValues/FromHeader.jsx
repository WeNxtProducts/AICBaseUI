import React from "react";

const FromHeader = ({ name }) => {
  return (
    <div className="from-header-container">
      <p className="user-entry-style select-none">{name}</p>
      <hr className="horizontal-line" />
    </div>
  );
};

export default FromHeader;
