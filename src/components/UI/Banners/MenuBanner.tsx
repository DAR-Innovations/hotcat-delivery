import React from "react";

const MenuBanner = () => {
  return (
    <picture>
      <img
        className="w-full sm:h-[400px] object-cover rounded-xl"
        loading="lazy"
        src="/assets/menuBanner.png"
        alt="sale"
      />
    </picture>
  );
};

export default MenuBanner;
