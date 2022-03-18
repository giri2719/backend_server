import { clinet } from "../index.js";

export async function deleteAllMovies() {
  return await clinet.db("ag").collection("movies").deleteMany({});
}
