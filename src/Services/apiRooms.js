import supabase from "./Supabase";

export async function getRooms(country, city) {
  // Start building the query
  let query = supabase.from("Rooms").select("*").ilike("country", country);

  // Add city filter if provided
  if (city) {
    query = query.ilike("city", city);
  }

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

export async function fetchRowsWithOptions(option, country, city) {
  let query = supabase.from("Rooms").select("*").like("filter", `%${option}%`);

  // Add country filter
  if (country) {
    query = query.eq("country", country);
  }

  // Add city filter if city is truthy
  if (city) {
    query = query.eq("city", city);
  }

  // Limit the range of fetched rows
  query = query.range(0, 151);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching rows:", error);
  } else {
    return data;
  }
}
