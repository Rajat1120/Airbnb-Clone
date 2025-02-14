import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import arrowLeft from "../../asset/Icons_svg/arrow-left.svg";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

// Custom hook for modal visibility management
const useModalVisibility = (isOpen) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 30);
    } else {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 150);
    }
  }, [isOpen]);

  return { visible, shouldRender };
};

// Custom hook for body overflow management
const useBodyOverflow = (isOpen) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};

// Back button component
const BackButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className="w-8 h-8 flex items-center justify-center cursor-pointer hover:rounded-full hover:bg-grey-dim"
  >
    <img className="w-4 h-4" src={arrowLeft} alt="Back" />
  </button>
);

// Location Description component
const LocationInfo = ({ location, children }) => (
  <div className="h-full pr-8 w-full 1md:max-w-[30rem]">
    <span className="text-[32px] leading-9 block font-semibold mb-8 w-full mt-4">
      Where you'll be
    </span>
    <div className="w-full h-full pb-10">
      <span className="block mb-4 font-medium">{location}</span>
      <span className="   whitespace-pre-wrap font-light">{children}</span>
    </div>
  </div>
);

// Map component
const LocationMap = ({ position }) => (
  <div className="h-full w-full">
    <MapContainer
      center={position}
      zoom={17}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFqYXQxMTIwMDAiLCJhIjoiY2x4c3Ixc3U5MWp5djJxc2hhMTNwMHY1YiJ9.nstYy61-k4ixPtceICiyug" />
      <ZoomControl position="bottomright" />
    </MapContainer>
  </div>
);

// Map styles
const MapStyles = () => (
  <style>
    {`.leaflet-control-attribution {
      display: none !important;
    }`}
  </style>
);

// Main modal component
const LocationDescriptionModal = ({ isOpen, onClose, children, position }) => {
  const ref = useRef();
  const { visible, shouldRender } = useModalVisibility(isOpen);
  useBodyOverflow(isOpen);

  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white flex justify-center z-50">
      <div
        id="calendar"
        ref={ref}
        className={`bg-white ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        } fixed top-0 transition-all duration-[0.2s] flex flex-col ease-in-out items-center justify-center w-full h-full shadow-md z-50`}
      >
        <MapStyles />
        <div className="w-full h-full items-start flex-col flex justify-between">
          <div className="w-full flex items-center pl-6 h-16">
            <BackButton onClose={onClose} />
          </div>
          <div className="pl-8 pr-8 h-full w-full pb-8">
            <div className="h-full flex-col  flex 1md:flex-row w-full">
              <LocationInfo location={houseInfo?.house_location}>
                {children}
              </LocationInfo>
              <LocationMap position={position} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LocationDescriptionModal;
