import React from "react";
import { IIconProps } from "./CartSolid";

const SuccessSolid = ({ className, filledColor }: IIconProps) => {
  return (
    <svg
      className={className || "w-10 h-10"}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle fill={filledColor || "#31AF91"} cx="64" cy="64" r="64" />
      </g>
      <g>
        <path
          fill="white"
          d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"
        />
      </g>
    </svg>
  );
};

export default SuccessSolid;
