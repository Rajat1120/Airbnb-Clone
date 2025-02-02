import supabase from "./Supabase";

export async function getRooms(ids, country, city, limit, offset) {
  let query = supabase
    .from("Rooms")
    .select("filter", { count: "exact" })
    .range(offset, offset + limit - 1);

  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  }

  if (country) {
    query = query.ilike("country", country);
  }

  if (city) {
    query = query.ilike("city", city);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching distinct room filters:", error);
    throw error;
  } else {
    return data;
  }
}

export async function getAllRows() {
  // Start building the query
  let query = supabase.from("Rooms").select("id,city, country, house-title");

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rooms:", error);
    throw error; // Return null or handle the error appropriately
  } else {
    return data;
  }
}

export async function getWishList(idsArray) {
  let { data, error } = await supabase
    .from("Rooms")
    .select("*") // Specify the columns you want to fetch
    .in("id", idsArray); // Fetch rows where the 'id' column matches any value in the array

  if (error) {
    throw error; // Handle error appropriately
  } else {
    return data;
  }
}

export async function getRoomInfo(id) {
  let { data, error } = await supabase
    .from("Rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return null; // Handle error appropriately
  } else {
    return data;
  }
}

export async function booking(data) {
  const { data: bookingData, error: dbError } = await supabase
    .from("Bookings")
    .insert([data])
    .select();

  if (dbError) {
    return dbError;
  } else {
    return bookingData;
  }
}

export async function getBooking(userEmail, roomId) {
  const { data: bookings, error } = await supabase
    .from("Bookings")
    .select("*") // Select all columns, you can specify only the ones you need
    .match({ user_email: userEmail, room_id: roomId });

  if (error) {
    console.error("Error fetching booking:", error);
    return { success: false, error: error };
  }

  if (bookings && bookings.length > 0) {
    return { success: true, booking: bookings[0] };
  } else {
    return { success: false, error: "No matching booking found" };
  }
}

export async function updateBooking(updateData) {
  // First, attempt to update the booking

  const { data, error } = await supabase
    .from("Bookings")
    .update({
      startDate: updateData?.startDate,
      endDate: updateData?.endDate,
      numOfDays: updateData?.numOfDays,
      guest: updateData?.guest,
    })
    .match({ user_email: updateData?.userEmail, room_id: updateData?.roomId })
    .select();

  if (error) {
    console.error("Booking update error:", error);
    return { success: false, error: error };
  } else {
    return data;
  }
}

export async function bookRoom(data) {
  const { data: paymentData, error: dbError } = await supabase
    .from("Payments")
    .insert(data);

  if (dbError) {
    throw dbError;
  } else {
    return paymentData;
  }
}

export async function getPayments(email) {
  let { data: Payments, error: paymentError } = await supabase
    .from("Payments")
    .select("*")
    .eq("user_email", email);

  if (paymentError) {
    throw paymentError;
  } else {
    return Payments;
  }
}

export async function fetchRowsWithOptions(
  ids,
  option,
  country,
  city,
  start = 0,
  end = 15
) {
  let query = supabase.from("Rooms").select("*");

  // Filter by IDs if provided
  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  }

  // Add option filter
  if (option) {
    query = query.ilike("filter", `%${option}%`);
  }

  // Add country filter
  if (country) {
    query = query.ilike("country", `%${country}%`);
  }

  // Add city filter if city is truthy
  if (city) {
    query = query.ilike("city", `%${city}%`);
  }

  // Limit the range of fetched rows
  query = query.range(start, end);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rows:", error);
    throw error;
  } else {
    return data;
  }
}
