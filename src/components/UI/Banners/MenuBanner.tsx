import React from "react";

const MenuBanner = () => {
  return (
    <picture>
      <img
        loading="lazy"
        className="w-full object-cover rounded-xl"
        src="/assets/menuBanner.png"
        alt="sale"
      />
    </picture>
  );
};

export default MenuBanner;
