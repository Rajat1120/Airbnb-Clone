import supabase from "./Supabase";

export async function getRooms() {
  const { data, error } = await supabase
    .from("Rooms")
    .select("*")
    .range(0, 151);

  if (error) {
    console.log(error);
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
