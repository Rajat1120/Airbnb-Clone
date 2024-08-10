import supabase from "./Supabase";

export async function getRooms(ids, country, city) {
  // Start building the query
  let query = supabase.from("Rooms").select("*");

  // Add ids filter if provided
  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  }

  // Add country filter if provided
  if (country) {
    query = query.ilike("country", country);
  }

  // Add city filter if provided
  if (city) {
    query = query.ilike("city", city);
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rooms:", error);
    throw error; // Throw the error to be handled by the caller
  } else {
    return data;
  }
}

export async function getAllRows() {
  // Start building the query
  let query = supabase.from("Rooms").select("*");

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rooms:", error);
    return null; // Return null or handle the error appropriately
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
