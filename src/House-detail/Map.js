import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationDescriptionModal from "./LocationDescriptionModal";
import showMore from "../data/Icons svg/arrow-right.svg";
import { useSelector } from "react-redux";

// Custom house icon
const houseIcon = new L.Icon({
  iconUrl: "/path/to/house-icon.png", // Provide your icon path here
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paragraphRef = useRef(null);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  let locationDescp = Boolean(houseInfo?.location_description);
  let houseLocation = Boolean(houseInfo?.house_location);
  console.log(locationDescp);

  let maxLines = 2;

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const lineHeight = parseInt(window.getComputedStyle(paragraph).lineHeight);
    const maxHeight = lineHeight * maxLines;

    if (paragraph.scrollHeight > maxHeight) {
      setIsOverflowing(true);
      paragraph.style.maxHeight = `${maxHeight}px`;
      paragraph.classList.add("truncateLocDes");
    } else {
      setIsOverflowing(false);
      paragraph.style.maxHeight = "none";
      paragraph.classList.remove("truncateLocDes");
    }
  }, [houseInfo, maxLines]);

  if (!houseLocation) return null;

  // Replace with actual coordinates
  const position = [51.505, -0.09];

  return (
    <div
      id="Location"
      className="w-full relative scroll-mt-20 after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[1px] after:bg-grey-dim z-10"
    >
      <div className="max-h-[50rem] w-full py-12">
        <div className="pb-6 w-full flex justify-start">
          <span className="w-full text-2xl font-medium">Where you'll be</span>
        </div>
        <div className="w-full h-[30rem] mb-8 rounded-xl overflow-hidden ">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl={false} // Disable default zoom control to position it manually
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            <ZoomControl position="bottomright" />{" "}
            {/* Positioning the zoom control */}
          </MapContainer>
        </div>
        <div className="w-full mt-6 flex flex-col gap-y-6 max-h-[8.75rem]">
          <div className="flex flex-col w-full">
            <span className="mb-4 font-medium">
              {houseInfo?.house_location}
            </span>
            {locationDescp && (
              <span
                ref={paragraphRef}
                className="font-light h-12 whitespace-pre-wrap overflow-hidden"
              >
                {houseInfo?.location_description}
              </span>
            )}
          </div>
          {isOverflowing && (
            <div className="w-full flex justify-start ">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center"
              >
                <span className="underline font-medium ">Show more</span>
                <span>
                  <img
                    className="h-6 w-6 "
                    src={showMore}
                    alt="Show more icon"
                  />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <LocationDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="w-full h-full ">
          {locationDescp && houseInfo?.location_description}
        </div>
      </LocationDescriptionModal>
    </div>
  );
};

export default Map;
