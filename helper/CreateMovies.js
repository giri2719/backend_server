import { clinet } from "../index.js";

export async function CreateMovies(newMovies) {
  return await clinet.db("ag").collection("movies").insertMany(newMovies);
}
