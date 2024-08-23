import { store } from "../Utils/Store";
import supabase from "./Supabase";

import { setUserData, setUserFavListing } from "../Main/AppSlice";

export const signInWithGoogle = async () => {
  let redirectUrl = window.location.href;

  // If the URL contains '/login', change the redirect URL to the home page ('/')
  if (redirectUrl.includes("/login")) {
    redirectUrl = `${window.location.origin}/`;
  }

  // Attempt to sign in with Google
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  });

  // Handle any errors that occur during sign-in
  if (error) {
    throw error;
  } else {
    // Dispatch user data to the store and log user/session information
    store.dispatch(setUserData(user));
  }
};

export const getUserLogout = async () => {
  store.dispatch(setUserData(null));
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

export const saveFavorite = async (itemId) => {
  try {
    const curUser = await supabase.auth.getUser();

    if (curUser.data.user) {
      const favoriteToInsert = {
        user_id: curUser.data.user.id,
        item_id: itemId,
      };

      const { data, error } = await supabase
        .from("Favorites")
        .insert(favoriteToInsert);

      if (error) {
        // Check if the error is due to a unique constraint violation
        if (error.code === "23505") {
          // The favorite already exists, so we can consider this a success
          return { message: "Favorite already exists" };
        }
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

export const deleteFavorite = async (itemId) => {
  try {
    const curUser = await supabase.auth.getUser();

    if (curUser.data.user) {
      const { error: deleteError } = await supabase
        .from("Favorites")
        .delete()
        .eq("user_id", curUser?.data.user.id)
        .eq("item_id", itemId);

      if (deleteError) {
        throw new Error("Error deleting favorite: " + deleteError.message);
      }
    }
  } catch (err) {
    throw err;
  }
};

export const getFavoriteListing = async (itemId) => {
  try {
    const curUser = await supabase.auth.getUser();
    let { data: Favorite, error } = await supabase
      .from("Favorites")
      .select("user_id,item_id")
      .eq("user_id", curUser.data.user.id) // Matches the specific user_id
      .eq("item_id", itemId); // Matches the specific item_id
    if (error) {
      return error;
    } else {
      return Favorite;
    }
  } catch (err) {}
};
