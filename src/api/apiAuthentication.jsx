import { store } from "../redux/Store";
import supabase from "./Supabase";

import { setUserData, setUserFavListing } from "../redux/AppSlice";

export const signInWithGoogle = async () => {
  // Get the current URL
  let redirectUrl = window.location.href;

  // Remove any existing auth parameters from the URL
  redirectUrl = redirectUrl.split("#")[0].split("?")[0];

  // If the URL contains '/login', change the redirect URL to the home page ('/')
  if (redirectUrl.includes("/login")) {
    redirectUrl = `${window.location.origin}/`;
  }

  // Attempt to sign in with Google
  const { user, error } = await supabase.auth.signInWithOAuth({
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

    // Clean up the URL after successful sign-in
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, redirectUrl);
    }
  }
};

export const getUserLogout = async () => {
  localStorage.clear();
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
  if (!Email || !Password) {
    console.error("Email and password are required!");
    throw new Error("Email and password are required.");
  }
  // Get the current URL
  let redirectUrl = window.location.href;

  // Remove any existing auth parameters from the URL
  redirectUrl = redirectUrl.split("#")[0].split("?")[0];

  // If the URL contains '/login', change the redirect URL to the home page ('/')
  if (redirectUrl.includes("/login")) {
    redirectUrl = `${window.location.origin}/`;
  }
  try {
    // Step 1: Log the user in with email and password
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: Email,
        password: Password,
        options: {
          redirectTo: redirectUrl,
        },
      });

    // Step 2: Check if login was successful
    if (loginError) {
      console.log(loginError);

      throw loginError;
    }

    // Step 3: Update the user metadata with the name "Guest"
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name: "Guest", email: "rajat@airbnb.com" },
    });

    if (updateError) {
      console.error("Error updating user metadata:", updateError.message);
      // Optionally, handle updateError (e.g., return or throw it)
    }

    // Step 4: Return the login data or updated user data
    window.location.reload();
    store.dispatch(setUserData(loginData));
    // Clean up the URL after successful sign-in
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, redirectUrl);
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error; // Re-throw error for further handling
  }
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
