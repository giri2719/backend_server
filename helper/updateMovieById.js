import { clinet } from "../index.js";

export async function updateMovieById(id, moviesDetails) {
  return await clinet
    .db("ag")
    .collection("movies")
    .updateOne({ id: id }, { $set: moviesDetails });
}
