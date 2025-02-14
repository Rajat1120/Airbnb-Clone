import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";

import LocationDescriptionModal from "./LocationDescriptionModal";
import showMore from "../../asset/Icons_svg/arrow-right.svg";
import TruncatedText from "./Truncatedtext";

// Custom hook for handling text overflow
const useTextOverflow = (maxLines, dependency) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * maxLines;

    setIsOverflowing(element.scrollHeight > maxHeight);
    // eslint-disable-next-line
  }, [dependency, textRef.current, maxLines]);

  return { isOverflowing, textRef };
};

// Custom hook for fetching coordinates
const useLocationCoordinates = (city) => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!city) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            city
          )}&format=json&limit=1`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [city]);

  return { position, loading };
};

// Map visualization component
const MapVisualization = ({ position }) => {
  return (
    <div className="w-full h-[30rem] mb-8 rounded-xl overflow-hidden">
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
};

// Location description component
const LocationDescription = ({
  houseLocation,
  locationDescription,
  textRef,
  isOverflowing,
  onShowMore,
}) => {
  return (
    <div className="w-full mt-6 flex flex-col gap-y-6 max-h-[8.75rem]">
      <div className="flex flex-col w-full">
        <span className="mb-4 font-medium">{houseLocation}</span>
        <TruncatedText
          text={locationDescription}
          textRef={textRef}
          maxLines={2}
          onShowMore={onShowMore}
          isOverflowing={isOverflowing}
          imgSrc={showMore}
        />
      </div>
    </div>
  );
};

// Main Map component
const Map = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const houseInfo = useSelector((store) => store.houseDetail.houseInfo);

  const { isOverflowing, textRef } = useTextOverflow(2, houseInfo);
  const { position, loading } = useLocationCoordinates(houseInfo?.city);

  const locationDescp = Boolean(houseInfo?.location_description);
  const houseLocation = Boolean(houseInfo?.house_location);

  if (!houseLocation) return null;
  if (loading) return <div>Loading map...</div>;

  return (
    <div
      id="Location"
      className="w-full px-5 1smm:px-0 relative scroll-mt-20 z-10"
    >
      <div className="max-h-[50rem] h-full w-full border-b border-grey-dim py-10 1xz:pb-8">
        <div className="pb-6 w-full flex justify-start">
          <span className="w-full text-2xl font-medium">Where you'll be</span>
        </div>

        <MapVisualization position={position} />

        <LocationDescription
          houseLocation={houseInfo?.house_location}
          locationDescription={houseInfo?.location_description}
          textRef={textRef}
          isOverflowing={isOverflowing}
          onShowMore={() => setIsModalOpen(true)}
        />
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
