import { clinet } from "../index.js";

export async function getAllMovies() {
  return await clinet.db("ag").collection("movies").find().toArray();
}
