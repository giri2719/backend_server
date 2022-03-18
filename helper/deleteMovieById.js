import { clinet } from "../index.js";

export async function deleteMovieById(id) {
  return await clinet.db("ag").collection("movies").deleteOne({ id: id });
}
