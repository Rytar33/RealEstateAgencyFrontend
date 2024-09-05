import React from "react";

const GoogleMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return null; // Если нет координат, не отображаем карту
  }

  return (
    <iframe
      className="self-center mt-12 max-w-full aspect-[1.67] w-[610px] max-md:mt-10"
      src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAjBMItZHJYt-9NE5GWTjwr3Nrgybd84vc&center=${latitude},${longitude}&zoom=14&maptype=roadmap`}
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMap;
