import React from "react";
import { IIconProps } from "./CartSolid";

const LoupeSolid = ({ className, filledColor }: IIconProps) => {
  return (
    <svg
      className={className || "w-10 h-10"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fill={filledColor || "black"}
          d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"
        />
      </g>
    </svg>
  );
};

export default LoupeSolid;
