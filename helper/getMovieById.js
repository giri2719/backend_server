import { clinet } from "../index.js";

export async function getMovieById(id) {
  return await clinet.db("ag").collection("movies").findOne({ id: id });
}
