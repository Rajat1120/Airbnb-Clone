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
  const [position, setPosition] = useState([51.505, -0.09]);
  const [loading, setLoading] = useState(true);
  const paragraphRef = useRef(null);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  let locationDescp = Boolean(houseInfo?.location_description);
  let houseLocation = Boolean(houseInfo?.house_location);

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

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (houseInfo?.city) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              houseInfo.city
            )}&format=json&limit=1`
          );
          const data = await response.json();
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error("Location not found");
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCoordinates();
  }, [houseInfo]);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (!houseLocation) return null;

  <style>
    {`.leaflet-control-attribution {
    display: none !important`}
  </style>;

  return (
    <div
      id="Location"
      className="w-full px-5 1smm:px-0 relative scroll-mt-20 after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[1px] after:bg-grey-dim z-10"
    >
      <div className="max-h-[50rem] w-full py-12">
        <div className="pb-6 w-full flex justify-start">
          <span className="w-full text-2xl font-medium">Where you'll be</span>
        </div>
        <div className="w-full h-[30rem] mb-8 rounded-xl overflow-hidden">
          <MapContainer
            center={position}
            zoom={17}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl={false} // Disable default zoom control to position it manually
          >
            <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFqYXQxMTIwMDAiLCJhIjoiY2x4c3Ixc3U5MWp5djJxc2hhMTNwMHY1YiJ9.nstYy61-k4ixPtceICiyug" />
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
            <div className="w-full flex justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center"
              >
                <span className="underline font-medium">Show more</span>
                <span>
                  <img
                    className="h-6 w-6"
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
        position={position}
      >
        <div className="w-full h-full">
          {locationDescp && houseInfo?.location_description}
        </div>
      </LocationDescriptionModal>
    </div>
  );
};

export default Map;
