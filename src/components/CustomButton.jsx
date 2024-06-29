import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);
  const generateStyle = (type) => {
    switch (type) {
      case "filled":
        return {
          border: "1px solid " + getContrastingColor(snap.color),
          backgroundColor: snap.color,
          color: getContrastingColor(snap.color),
        };
      case "outlined":
        return {
          border: "1px solid " + getContrastingColor(snap.color),
          color: getContrastingColor(snap.color),
        };
      default:
        return "bg-blue-500 text-white";
    }
  };
  return (
    <button
      className={`px-2 py-1.5 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
