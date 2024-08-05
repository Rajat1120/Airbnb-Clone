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
