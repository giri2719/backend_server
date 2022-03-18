import express from "express";
import { updateMovieById } from "../helper/updateMovieById.js";
import { getAllMovies } from "../helper/getAllMovies.js";
import { deleteAllMovies } from "../helper/deleteAllMovies.js";
import { CreateMovies } from "../helper/CreateMovies.js";
import { getMovieById } from "../helper/getMovieById.js";
import { deleteMovieById } from "../helper/deleteMovieById.js";
const router = express.Router();

router.get("/", async function (request, response) {
  const movie = await getAllMovies();
  response.send(movie); //getting the data from the database
  //response.send(movies)  getting the data from the movies array list
});
router.delete("/", async function (request, response) {
  const movie = await deleteAllMovies();
  response.send(movie);
});
router.post("/", async function (request, response) {
  const newMovies = request.body;
  const result = await CreateMovies(newMovies);
  response.send(result);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const movieById = await getMovieById(id);
  response.send(movieById); //getting the data from the database
  //response.send(movies.filter(data=>data.id===id)) getting the data from the movies array list
});
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const movieById = await deleteMovieById(id);
  response.send(movieById);
});
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const moviesDetails = request.body;
  const result = await updateMovieById(id, moviesDetails);
  response.send(result);
});
export const movieRouter = router;
