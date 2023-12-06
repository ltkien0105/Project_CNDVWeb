const {
  createObject,
  createTable,
  createMovieTable,
  createRelationMovieTable,
} = require("./utils/create_db_func");
const db_total = require("./utils/db_total.json");
const db_specificed = require("./utils/db_specificed.json");

const tables = [
  "movie_director",
  "movie_star",
  "movie_genre",
  "movie_writer",
  "movie",
  "director",
  "writer",
  "star",
  "genre",
  "account",
];

const movies = db_total.movies;
const directors = createObject(db_specificed.directors);
const writers = createObject(db_specificed.writers);
const stars = createObject(db_specificed.stars);
const genres = createObject(db_specificed.genres);

const { movieDirector, movieWriter, movieStar, movieGenre } =
  createRelationMovieTable(movies, directors, writers, stars, genres);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  for (const table of tables) {
    await knex(table).del();
    if (
      table === "movie" ||
      table === "director" ||
      table === "star" ||
      table === "genre" ||
      table === "writer"
    ) {
      await knex.raw(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
    }
  }

  await knex("director").insert(createTable(directors));
  await knex("writer").insert(createTable(writers));
  await knex("star").insert(createTable(stars));
  await knex("genre").insert(createTable(genres));
  await knex("movie").insert(createMovieTable(movies));
  await knex("movie_director").insert(movieDirector);
  await knex("movie_writer").insert(movieWriter);
  await knex("movie_star").insert(movieStar);
  await knex("movie_genre").insert(movieGenre);
};
