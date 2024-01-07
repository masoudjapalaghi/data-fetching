import React from "react";

const Spinner = ({ isFullScreen }: { isFullScreen?: boolean }) => {
  return (
    <span className={isFullScreen ? "loader_fullscreen" : ""}>
      <span className="loader"></span>
    </span>
  );
};

export default Spinner;
