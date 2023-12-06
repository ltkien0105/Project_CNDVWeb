const knex = require("../database/knex");
const Paginator = require("./paginator");

function makeMoviesService() {
  function readMovie(payload) {
    const movie = {
      title: payload.title,
      description: payload.description,
      img_url: payload.img_url,
      rating: payload.rating,
      release_year: payload.release_year,
      duration: payload.duration,
      trailer_url: payload.trailer_url,
    };
    // Remove undefined fields
    Object.keys(movie).forEach(
      (key) => movie[key] === undefined && delete movie[key]
    );
    return movie;
  }

  async function createMovie(payload) {
    const movie = readMovie(payload);
    const [id] = await knex("movie").insert(movie);
    return { id, ...movie };
  }

  async function getDirectors(id) {
    let directors = await knex("movie")
      .join("movie_director", "movie.id", "=", "movie_director.movie_id")
      .join("director", "movie_director.director_id", "=", "director.id")
      .select("director.name")
      .whereRaw("movie.id = ?", [id]);

    directors = directors.map((director) => director.name);

    return directors;
  }

  async function getWriters(id) {
    let writers = await knex("movie")
      .join("movie_writer", "movie.id", "=", "movie_writer.movie_id")
      .join("writer", "movie_writer.writer_id", "=", "writer.id")
      .select("writer.name")
      .whereRaw("movie.id = ?", [id]);

    writers = writers.map((writer) => writer.name);
    return writers;
  }

  async function getStars(id) {
    let stars = await knex("movie")
      .join("movie_star", "movie.id", "=", "movie_star.movie_id")
      .join("star", "movie_star.star_id", "=", "star.id")
      .select("star.name")
      .whereRaw("movie.id = ?", [id]);

    stars = stars.map((star) => star.name);
    return stars;
  }

  async function getGenres(id) {
    let genres = await knex("movie")
      .join("movie_genre", "movie.id", "=", "movie_genre.movie_id")
      .join("genre", "movie_genre.genre_id", "=", "genre.id")
      .select("genre.name")
      .whereRaw("movie.id = ?", [id]);

    genres = genres.map((genre) => genre.name);
    return genres;
  }

  async function getMovieById(id) {
    let movie = await knex("movie").select("*").where({ id: id }).first();
    const directors = await getDirectors(id);
    const writers = await getWriters(id);
    const stars = await getStars(id);
    const genres = await getGenres(id);

    movie["directors"] = directors;
    movie["writers"] = writers;
    movie["stars"] = stars;
    movie["genres"] = genres;

    return movie;
  }

  async function updateMovie(id, payload) {
    const update = readMovie(payload);
    return knex("movie").where("id", id).update(update);
  }

  async function deleteMovie(id) {
    return knex("movie").where("id", id).del();
  }

  async function deleteAllMovies() {
    return knex("movie").del();
  }

  async function getMoviesPage(query) {
    const { page = 1, limit = 12 } = query;
    const paginator = new Paginator(page, limit);

    let results = await knex("movie")
      .select(
        knex.raw("count(id) OVER() AS recordsCount"),
        "id",
        "title",
        "description",
        "img_url",
        "rating",
        "release_year",
        "duration",
        "trailer_url"
      )
      .limit(paginator.limit)
      .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordsCount;
      delete result.recordsCount;
      return result;
    });

    return {
      metadata: paginator.getMetadata(totalRecords),
      movies: results,
    };
  }

  async function getMoviesSameGenre(id, genres) {
    let whereRaw = `not movie.id = ${id} and (`;
    for (let [index, genre] of genres.entries()) {
      whereRaw += `name = "${genre}"`;
      if (index !== genres.length - 1) {
        whereRaw += " or ";
      }
    }
    whereRaw += ")";

    let movies = await knex("movie")
      .join("movie_genre", "movie.id", "=", "movie_genre.movie_id")
      .join("genre", "movie_genre.genre_id", "=", "genre.id")
      .select("movie.id", "movie.title", "movie.img_url", "movie.rating")
      .whereRaw(whereRaw)
      .limit(12);

    return movies;
  }

  async function getMovieByRating(query) {
    const { page = 1, limit = 12 } = query;
    const paginator = new Paginator(page, limit);

    let results = await knex("movie")
      .select(
        knex.raw("count(id) OVER() AS recordsCount"),
        "id",
        "title",
        "description",
        "img_url",
        "rating",
        "release_year",
        "duration",
        "trailer_url"
      )
      .orderBy("rating", "desc")
      .limit(paginator.limit)
      .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordsCount;
      delete result.recordsCount;
      return result;
    });

    return {
      metadata: paginator.getMetadata(totalRecords),
      movies: results,
    };
  }

  async function getMovieByYear(query) {
    const { page = 1, limit = 12 } = query;
    const paginator = new Paginator(page, limit);

    let results = await knex("movie")
      .select(
        knex.raw("count(id) OVER() AS recordsCount"),
        "id",
        "title",
        "description",
        "img_url",
        "rating",
        "release_year",
        "duration",
        "trailer_url"
      )
      .orderBy("release_year", "desc")
      .limit(paginator.limit)
      .offset(paginator.offset);

    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordsCount;
      delete result.recordsCount;
      return result;
    });

    return {
      metadata: paginator.getMetadata(totalRecords),
      movies: results,
    };
  }

  async function getAllGenres() {
    let genres = await knex("genre").select("*");
    genres = genres.map((genre) => genre.name);
    return genres;
  }

  async function getMoviesByGenre(genre) {
    let movies = await knex("movie")
      .join("movie_genre", "movie.id", "=", "movie_genre.movie_id")
      .join("genre", "movie_genre.genre_id", "=", "genre.id")
      .select("movie.id", "movie.title", "movie.img_url", "movie.rating")
      .whereRaw(`genre.name = "${genre}"`)
      .limit(12);

    return movies;
  }

  async function getMoviesFromAllGenres() {
    const genres = await getAllGenres();

    let movies = {};
    for (let genre of genres) {
      let genreMovies = await getMoviesByGenre(genre);

      movies[genre] = genreMovies;
    }

    return movies;
  }

  return {
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
    deleteAllMovies,
    getMoviesPage,
    getMoviesSameGenre,
    getMovieByRating,
    getMovieByYear,
    getMoviesFromAllGenres,
  };
}

module.exports = makeMoviesService;
