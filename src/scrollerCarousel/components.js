import React from "react";

export const ControlButton = ({ className, onClick, children }) => {
  return (
    <div className={`control-button ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
