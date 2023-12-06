const express = require("express");
const moviesController = require("../controllers/movies.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
  .route("/")
  .get(moviesController.getMoviesPage)
  .post(moviesController.createMovie)
  .delete(moviesController.deleteAllMovies)
  .all(methodNotAllowed);

router
  .route("/rating")
  .get(moviesController.getMovieByRating)
  .all(methodNotAllowed);

router.route("/recently").get(moviesController.getMovieByYear);

router
  .route("/genres")
  .get(moviesController.getMoviesFromAllGenres)
  .all(methodNotAllowed);

router
  .route("/:id(\\d+)")
  .get(moviesController.getMovieById)
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie)
  .all(methodNotAllowed);

module.exports = router;
