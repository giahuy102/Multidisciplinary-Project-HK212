import React from "react";
import "./style.css"
const Switch = ({ value, onClick, onColor, id }) => {
  return (
    <>
      <input
        checked={value}
        onChange={onClick}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        style={{ background: value && onColor }}
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
