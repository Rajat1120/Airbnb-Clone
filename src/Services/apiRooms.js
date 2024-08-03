import supabase from "./Supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("Rooms").select("*");

  if (error) {
    console.log(error);
  } else {
    return data;
  }
}
