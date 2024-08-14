import store from "../Utils/Store";
import supabase from "./Supabase";
import {
  setFavListingFromApi,
  setUserData,
  setUserFavListing,
} from "../Main/AppSlice";

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error signing in with Google:", error);
  } else {
    console.log("User:", user);

    console.log("Session:", session);
    // Handle the user and session as needed
  }
};

export const getUserLogout = async () => {
  await saveFavorite();
  let { error } = await supabase.auth.signOut();

  if (error) {
    return error;
  } else {
    window.location.reload();
  }
};

export const getUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    store.dispatch(setUserData(user));

    const { data: favorites } = await supabase
      .from("Favorites")
      .select("item_id")
      .eq("user_id", user.id);

    if (favorites) {
      store.dispatch(setUserFavListing(favorites.map((fav) => fav.item_id)));
      store.dispatch(setFavListingFromApi(favorites.map((fav) => fav.item_id)));
    }
    return user;
  } else {
    return null;
  }
};

getUserData();

export const loginWithEmail = async (Email, Password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: Email,
    password: Password,
  });

  console.log(data);
  console.log(error);
};

export const saveFavorite = async () => {
  try {
    const curUser = await supabase.auth.getUser();

    if (curUser.data.user) {
      const itemIds = store.getState().app.userFavListing;
      const existingItemIds = store.getState().app.userFavListingsFromApi;

      const newFavorites = itemIds.filter(
        (itemId) => !existingItemIds.includes(itemId)
      );

      // Prepare an array of objects to insert
      const favoritesToInsert = newFavorites.map((itemId) => ({
        user_id: curUser.data.user.id,
        item_id: itemId,
      }));

      const { data, error } = await supabase
        .from("Favorites")
        .insert(favoritesToInsert);

      if (error) {
        throw new Error("Error saving favorite: " + error.message);
      } else {
        return data;
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw err; // Re-throw the error to handle it in the calling function
  }
};

window.addEventListener("beforeunload", async () => {
  await saveFavorite();
});
