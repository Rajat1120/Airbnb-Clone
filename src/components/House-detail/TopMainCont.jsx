import React, { useEffect, useState } from "react";
import share from "../../asset/Icons_svg/shareIcon.svg";

import dots from "../../asset/Icons_svg/dots.svg";
import { useNavigate, useParams } from "react-router";
import arrowLeft from "../../asset/Icons_svg/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import ImageGalleryModal from "./ImageGalleryModal";
import { svg } from "../../asset/HeartIconSvg";
import {
  removeUserFavListing,
  setIsFavorite,
  setItemId,
  setShowLogin,
  setUserFavListing,
} from "../../redux/AppSlice";
import { deleteFavorite, saveFavorite } from "../../api/apiAuthentication";

const ImageCarouselSkeleton = () => {
  return (
    <div className="w-full h-full ">
      <div className="w-full h-full flex overflow-x-auto">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              aspectRatio: "16/10",
              width: "100%",
              height: "100%",
            }}
            className="bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

const ActionBar = ({ houseInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, userFavListing } = useSelector((store) => store.app);

  const isFavorite = userFavListing?.includes(houseInfo?.id);

  // Function to handle favorite logic
  const handleFavoriteToggle = () => {
    if (!userData) {
      dispatch(setShowLogin(true));
    } else {
      if (isFavorite) {
        dispatch(removeUserFavListing(houseInfo?.id));
        dispatch(setIsFavorite(false));
      } else {
        dispatch(setUserFavListing(houseInfo?.id));
        dispatch(setIsFavorite(true));
      }
      dispatch(setItemId(houseInfo?.id));
    }
  };

  return (
    <div className="w-full px-3 flex items-center justify-between h-16">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="h-8 w-8 rounded-full hover:bg-grey-dim flex-center"
      >
        <img src={arrowLeft} className="w-4 h-4" alt="Go back" />
      </button>

      {/* Action Buttons */}
      <div className="space-x-2 items-center flex justify-between">
        {/* Share Button */}
        <button className="underline cursor-auto rounded-full h-8 w-8 flex-center hover:bg-shadow-gray-light text-sm font-medium">
          <img className="w-5 h-5 py-[1px]" src={share} alt="Share" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="underline rounded-full w-8 h-8 flex-center hover:bg-shadow-gray-light text-sm font-medium"
        >
          {svg(houseInfo?.id, userFavListing, userData)}
        </button>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  return (
    <div
      className="w-full h-full flex overflow-x-auto"
      style={{
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {images.map((img, index) => (
        <CarouselImage key={index} src={img} />
      ))}
    </div>
  );
};

const CarouselImage = ({ src }) => (
  <img className="carousel-image" src={src} alt="Carousel" />
);

const HouseImageCarousel = ({ isLoading, houseInfo }) => {
  return (
    <div className="w-full min-h-80 h-full">
      {isLoading ? (
        <ImageCarouselSkeleton />
      ) : (
        <ImageCarousel images={houseInfo?.images || []} />
      )}
    </div>
  );
};

// Custom hook to handle favorite listing logic
function useFavoriteHandler(houseInfo, userFavListing, userData, dispatch) {
  const toggleFavorite = () => {
    if (!userData) {
      dispatch(setShowLogin(true));
    } else {
      const isFavorite = userFavListing.includes(houseInfo.id);
      if (isFavorite) {
        dispatch(removeUserFavListing(houseInfo.id));
        dispatch(setIsFavorite(false));
      } else {
        dispatch(setUserFavListing(houseInfo.id));
        dispatch(setIsFavorite(true));
      }
      dispatch(setItemId(houseInfo.id));
    }
  };

  return toggleFavorite;
}

// Share and Save Button Component
const ActionButtons = ({ houseInfo, userFavListing, userData, dispatch }) => {
  const handleFavorite = useFavoriteHandler(
    houseInfo,
    userFavListing,
    userData,
    dispatch
  );

  return (
    <div className="pt-6 hidden 1xz:flex justify-between w-[10rem]">
      <button className="underline w-[5.2rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex">
        <img className="w-[1.2rem] h-[1.2rem] pt-1" src={share} alt="Share" />
        <span className="h-[1.2rem]">Share</span>
      </button>

      <button
        onClick={handleFavorite}
        className="underline w-[4.8rem] rounded-md h-8 hover:bg-shadow-gray-light text-sm font-medium justify-center hover:cursor-pointer gap-2 items-center flex"
      >
        {svg(houseInfo?.id, userFavListing, userData)}
        <span className="h-[1.2rem]">Save</span>
      </button>
    </div>
  );
};

// Skeleton Loading Component
const LoadingSkeleton = ({ width }) => (
  <div
    className={`pt-6 bg-gray-200 animate-pulse text-[1.68rem] ${width} h-5 mt-10 font-[460]`}
  ></div>
);

const HouseDetailHeader = ({
  isLoading,
  houseInfo,
  userFavListing,
  userData,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-7xl w-full px-5 1xz:px-10 1lg:px-20 flex justify-between">
      <div>
        {isLoading ? (
          <LoadingSkeleton width="w-96" />
        ) : (
          <h1 className="pt-6 text-[1.68rem] hidden 1xz:block font-[460]">
            {houseInfo?.title_1}
          </h1>
        )}
      </div>

      {isLoading ? (
        <LoadingSkeleton width="w-[10rem]" />
      ) : (
        <ActionButtons
          houseInfo={houseInfo}
          userFavListing={userFavListing}
          userData={userData}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

// Image Grid Loader (Skeleton for loading state)
const ImageGridLoader = ({ gridLayout }) => (
  <div className="grid-areas rounded-xl overflow-hidden">
    {gridLayout.map((gridArea, index) => (
      <div
        key={index}
        className={`${gridArea} bg-gray-200 animate-pulse`}
      ></div>
    ))}
  </div>
);

// Image Grid Component (Displays images after loading)
const ImageGrid = ({ gridLayout, houseImages, onShowAllPhotos }) => (
  <div className="grid-areas hidden 1xz:grid rounded-xl overflow-hidden">
    {gridLayout.map((gridArea, index) => (
      <div key={index} className={gridArea}>
        {houseImages?.[index] && (
          <img
            src={houseImages[index]}
            alt={`House-image-${index + 1}`}
            className="w-full h-full object-cover"
          />
        )}
        {index === 4 && <ShowAllPhotosButton onClick={onShowAllPhotos} />}
      </div>
    ))}
  </div>
);

// Button to Show All Photos (Visible on the 5th image)
const ShowAllPhotosButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex-center cursor-pointer text-nowrap w-[9rem] 1smm:w-[10rem] h-8 bg-white absolute bottom-5 right-2 1smm:right-5 gap-x-2 rounded-lg border-[1px] border-black"
  >
    <img src={dots} className="!w-4 !h-4" alt="Dots icon" />
    <span className="text-sm font-medium">Show all photos</span>
  </div>
);

const HouseImagesSection = ({ isLoading, houseInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowAllPhotos = () => setIsModalOpen(true);

  return (
    <div className="max-w-7xl hidden 1xz:block w-full px-10 1lg:px-20">
      <div className="pt-6">
        {isLoading ? (
          <ImageGridLoader gridLayout={gridLayout} />
        ) : (
          <ImageGrid
            gridLayout={gridLayout}
            houseImages={houseInfo?.images}
            onShowAllPhotos={handleShowAllPhotos}
          />
        )}
      </div>

      {/* Modal for showing all images */}
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {houseInfo?.images}
      </ImageGalleryModal>
    </div>
  );
};

// Pre-define the grid layout
const gridLayout = [
  "grid-area-image1",
  "grid-area-image2",
  "grid-area-image3",
  "grid-area-image4",
  "grid-area-image5",
];

// Main Component

const TopMainCont = () => {
  const { id } = useParams();

  const { isLoading, houseInfo } = useSelector((store) => ({
    isLoading: store.houseDetail.isLoading,
    houseInfo: store.houseDetail.houseInfo[id],
  }));

  const { userData, userFavListing, isFavorite } = useSelector(
    (store) => store.app
  );

  useEffect(() => {
    const handleUpdate = async () => {
      if (houseInfo?.id && userData) {
        if (isFavorite) {
          await saveFavorite(houseInfo.id);
        } else {
          await deleteFavorite(houseInfo.id);
        }
      }
    };

    handleUpdate();
  }, [userFavListing, isFavorite, userData, houseInfo?.id]);

  return (
    <div className="flex-center flex-col">
      <div className="w-full 1xz:hidden">
        <ActionBar houseInfo={houseInfo}></ActionBar>
        <HouseImageCarousel
          isLoading={isLoading}
          houseInfo={houseInfo}
        ></HouseImageCarousel>
      </div>
      <HouseDetailHeader
        houseInfo={houseInfo}
        isLoading={isLoading}
        userFavListing={userFavListing}
        userData={userData}
      ></HouseDetailHeader>
      <HouseImagesSection
        isLoading={isLoading}
        houseInfo={houseInfo}
      ></HouseImagesSection>
    </div>
  );
};

export default TopMainCont;
