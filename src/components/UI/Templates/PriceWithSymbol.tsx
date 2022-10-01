import React from "react";
import TengeSolid from "../Icons/TengeSolid";

interface PriceWithSymbolProps {
  price: number | string | undefined;
  classNameOfSymbol?: string;
  classNameOfPrice?: string;
  className?: string;
  fill?: string;
}

const PriceWithSymbol = ({
  price = 0,
  className,
  classNameOfSymbol,
  classNameOfPrice,
  fill,
}: PriceWithSymbolProps) => {
  return (
    <div className={"flex items-center gap-[6px] " + className}>
      <p className={classNameOfPrice}>{price}</p>
      <TengeSolid
        className={`${classNameOfSymbol || "h-[14px] w-[14px]"} -mt-1`}
        filledColor={fill || "black"}
      />
    </div>
  );
};

export default PriceWithSymbol;
