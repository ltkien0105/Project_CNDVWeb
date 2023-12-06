const makeMoviesService = require("../services/movies.service");
const ApiError = require("../api-error");

//Create and Save a new movie
async function createMovie(req, res, next) {
  if (!req.body?.title) {
    return next(new ApiError(400, "Title can not be empty"));
  }

  try {
    const moviesService = makeMoviesService();
    const movie = await moviesService.createMovie(req.body);
    return res.send(movie);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occured while creating the movie"));
  }
}

async function getMovieById(req, res, next) {
  let movie = [];
  let moviesSameGenre = [];

  try {
    const moviesService = makeMoviesService();
    movie = await moviesService.getMovieById(req.params.id);
    moviesSameGenre = await moviesService.getMoviesSameGenre(
      req.params.id,
      movie.genres
    );
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while getting movie"));
  }
  return res.send({ movie, moviesSameGenre });
}

async function getMoviesPage(req, res, next) {
  let movies = [];

  try {
    const moviesService = makeMoviesService();
    movies = await moviesService.getMoviesPage(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred when retrieving movies"));
  }

  return res.send(movies);
}

async function getMovie(req, res, next) {
  try {
    const moviesService = makeMoviesService();
    const movie = await moviesService.getMovieById(req.params.id);
    if (!movie) {
      return next(new ApiError(404, "Movie not found"));
    }
    return res.send(movie);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving movie with id=${req.params.id}`)
    );
  }
}

async function updateMovie(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const moviesService = makeMoviesService();
    const updated = await moviesService.updateMovie(req.params.id, req.body);
    if (!updated) {
      return next(new ApiError(404, "Movie not found"));
    }
    return res.send({ message: "Movie was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating movie with id=${req.params.id}`)
    );
  }
}

async function deleteMovie(req, res, next) {
  try {
    const moviesService = makeMoviesService();
    const deleted = await moviesService.deleteMovie(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Movie not found"));
    }
    return res.send({ message: "Movie was deleted successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete movie with id=${req.params.id}`)
    );
  }
}

function deleteAllMovies(req, res, next) {
  try {
    const moviesService = makeMoviesService();
    const deleted = moviesService.deleteAllMovies();
    return res.send({ message: `${deleted} movies were deleted successfully` });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred when deleting all movies")
    );
  }
}

async function getMovieByRating(req, res, next) {
  let movies = [];

  try {
    const moviesService = makeMoviesService();
    movies = await moviesService.getMovieByRating(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while retrieving movies"));
  }
  return res.send(movies);
}

async function getMovieByYear(req, res, next) {
  let movies = [];

  try {
    const moviesService = makeMoviesService();
    movies = await moviesService.getMovieByYear(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while retrieving movies"));
  }
  return res.send(movies);
}

async function getMoviesFromAllGenres(req, res, next) {
  let movies = [];

  try {
    const moviesService = makeMoviesService();
    movies = await moviesService.getMoviesFromAllGenres();
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while getting movies"));
  }

  return res.send(movies);
}

module.exports = {
  getMoviesPage,
  deleteAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getMovieByRating,
  getMovieByYear,
  getMoviesFromAllGenres,
};
