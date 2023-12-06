function createObject(datas) {
  const object = {};
  for (const data of datas) {
    object[`${data[1]}`] = data[0];
  }

  return object;
}

function createTable(object) {
  return Object.keys(object).map((key) => {
    return {
      name: key,
    };
  });
}

function getDataFromMovie(movie) {
  const id = movie.id.slice(3);
  const title = movie.title;
  const description = movie.description;
  const directors = movie.Director;
  const writers = movie.Writers;
  const stars = movie.Stars;
  const genres = movie.genre;
  const imgUrl = movie.images[1][1];
  const rating = () => {
    const ratingNumber = parseFloat(movie.rating);
    if (ratingNumber >= 0.0 && ratingNumber <= 2.0) {
      return 1;
    } else if (ratingNumber > 2.0 && ratingNumber <= 4.0) {
      return 2;
    } else if (ratingNumber > 4.0 && ratingNumber <= 6.0) {
      return 3;
    } else if (ratingNumber > 6.0 && ratingNumber <= 8.0) {
      return 4;
    } else {
      return 5;
    }
  };
  const releaseYear = movie.year;
  const trailer = movie.trailer;
  const duration = movie.duration;

  return {
    id,
    title,
    description,
    directors,
    writers,
    stars,
    genres,
    imgUrl,
    rating: rating(),
    releaseYear,
    trailer,
    duration,
  };
}

function createMovieTable(movies) {
  const moviesInsert = [];
  for (const movie of movies) {
    const data = getDataFromMovie(movie);

    moviesInsert.push({
      description: data.description,
      img_url: data.imgUrl,
      rating: data.rating,
      release_year: data.releaseYear,
      title: data.title,
      trailer_url: data.trailer,
      duration: data.duration,
    });
  }

  return moviesInsert;
}

function createRelationMovieTable(movies, directors, writers, stars, genres) {
  const movieDirector = [];
  const movieWriter = [];
  const movieStar = [];
  const movieGenre = [];
  for (const movie of movies) {
    const id = movie.id.slice(3);
    const directorsArray = movie.Director.map(
      (director) => directors[director]
    );
    const writersArray = movie.Writers.map((writer) => writers[writer]);
    const starsArray = movie.Stars.map((star) => stars[star]);
    const genresArray = movie.genre.map((genr) => genres[genr]);

    for (const director of directorsArray) {
      movieDirector.push({
        movie_id: id,
        director_id: director,
      });
    }
    for (const writer of writersArray) {
      movieWriter.push({
        movie_id: id,
        writer_id: writer,
      });
    }
    for (const star of starsArray) {
      movieStar.push({
        movie_id: id,
        star_id: star,
      });
    }
    for (const genre of genresArray) {
      movieGenre.push({
        movie_id: id,
        genre_id: genre,
      });
    }
  }

  return {
    movieDirector,
    movieWriter,
    movieStar,
    movieGenre,
  };
}

module.exports = {
  createObject,
  createTable,
  createMovieTable,
  createRelationMovieTable,
};
