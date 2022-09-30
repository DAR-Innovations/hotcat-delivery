import BurgerOpenSolid from "components/UI/Icons/BurgerSolid";
import React, { MouseEventHandler } from "react";
import CloseSolid from "../UI/Icons/CloseSolid";

interface BurgerButtonProps {
  handleBtn: MouseEventHandler;
  isActive: boolean;
}

const BurgerButtonHandler = ({ handleBtn, isActive }: BurgerButtonProps) => {
  return (
    <div onClick={handleBtn} className="order-10 inline-block sm:hidden">
      {isActive ? (
        <CloseSolid className="w-7 h-7 cursor-pointer" />
      ) : (
        <BurgerOpenSolid className="w-7 h-7 cursor-pointer" />
      )}
    </div>
  );
};

export default BurgerButtonHandler;
