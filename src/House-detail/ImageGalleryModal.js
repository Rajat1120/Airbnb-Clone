import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const generateGridAreas = (imageCount) => {
  const basePattern = [
    ["image1", "image2"],
    ["image1", "image3"],
    ["image4", "image4"],
    ["image4", "image4"],
    ["image5", "image6"],
    ["image7", "image7"],
    ["image7", "image7"],
    ["image8", "image9"],
  ];

  let areas = [];
  let currentImage = 1;

  while (currentImage <= imageCount) {
    for (let row of basePattern) {
      if (currentImage > imageCount) break;
      let newRow = row.map((cell) => {
        if (cell.startsWith("image") && currentImage <= imageCount) {
          return `image${currentImage++}`;
        }
        return "."; // Use "." for empty cells
      });
      areas.push(newRow);
    }
  }

  return areas.map((row) => `"${row.join(" ")}"`).join("\n");
};

let arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    className="w-4 h-4"
    style={{
      display: "block",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "4",
      overflow: "visible",
    }}
  >
    <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
  </svg>
);
const ImageGalleryModal = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 30);
    } else {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const gridAreas = generateGridAreas(children.length);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white flex justify-center z-50">
      <div
        ref={ref}
        className={`bg-white ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        } fixed top-0 transition-all duration-200 flex flex-col ease-in-out items-center justify-center w-full h-full shadow-md z-50`}
      >
        <div className="w-full h-full items-start flex-col flex">
          <div className="w-full flex items-center pl-6 h-16">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
            >
              {arrowLeft}
            </button>
          </div>
          <div className="1smd:pl-8 pt-10 h-full pb-20 overflow-auto 1smd:pr-8 w-full">
            <div
              className="grid-gallery 1xz:px-5 1smm:px-10  1xz:mx-5 1smm:mx-10 1xlx:px-28 1xlx:mx-36"
              style={{
                display: "grid",
                gridTemplateAreas: gridAreas,
                gap: "0.5rem",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: `repeat(${Math.ceil(
                  children.length / 2
                )}, 16rem)`,
              }}
            >
              {children.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="h-full w-full object-cover"
                  style={{ gridArea: `image${index + 1}` }}
                  alt={`Gallery img ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageGalleryModal;
