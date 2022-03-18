import { clinet } from "../index.js";

export async function get_all_userid() {
  return await clinet.db("ag").collection("users").find().toArray();
}
