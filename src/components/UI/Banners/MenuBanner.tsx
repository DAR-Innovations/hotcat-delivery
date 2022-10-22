import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MenuBanner = () => {
  return (
    <picture>
      <LazyLoadImage
        effect="blur"
        width="100%"
        className="w-full object-cover rounded-xl"
        loading="lazy"
        src="/assets/menuBanner.png"
        alt="sale"
      />
    </picture>
  );
};

export default MenuBanner;
