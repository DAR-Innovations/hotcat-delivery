import React from "react";
import { IIconProps } from "./CartSolid";

const BackSolid = ({ className, filledColor }: IIconProps) => {
  return (
    <svg
      className={className || "w-10 h-10"}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill={filledColor || "#00000"}
        points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "
      />
    </svg>
  );
};

export default BackSolid;
