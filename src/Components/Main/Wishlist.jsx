import React, { useEffect, useRef, useState } from "react";

import { svg } from "../../asset/HeartIconSvg";
import { useQuery } from "@tanstack/react-query";
import { getWishList } from "../../api/apiRooms";

import { deleteFavorite, saveFavorite } from "../../api/apiAuthentication";

import WishlistPage from "./WishListPage";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const [wishList, setWishList] = useState(null);
  const { favListings, userData, isFavorite, itemId } = useSelector(
    (store) => ({
      favListings: store.app.userFavListing,
      userData: store.app.userData,
      isFavorite: store.app.isFavorite,
      itemId: store.app.itemId,
    })
  );

  useEffect(() => {
    const handleUpdate = async () => {
      if (itemId && userData) {
        if (isFavorite) {
          await saveFavorite(itemId);
        } else {
          await deleteFavorite(itemId);
        }
      }
    };

    handleUpdate();
  }, [favListings, isFavorite, userData, itemId]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["wishList"],
    queryFn: () => getWishList(favListings),
    enabled: false,
  });

  let firstRender = useRef(false);

  useEffect(() => {
    let timeoutId;

    if (favListings.length && !firstRender.current) {
      refetch();

      timeoutId = setTimeout(() => {
        firstRender.current = true;
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [refetch, favListings, isLoading]);

  useEffect(() => {
    if (data) {
      setWishList(data); // Always set the latest data
    }
  }, [data]);

  return (
    <WishlistPage
      userData={userData}
      isLoading={isLoading}
      wishList={wishList}
      favListings={favListings}
      svg={svg}
    ></WishlistPage>
  );
};

export default Wishlist;
