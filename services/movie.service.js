// The combined models and services are models, as adding services directly to controllers would clutter them.
const Movie = require("../models/movie.model");

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);

  if (!movie) {
    return {
      err: "MOVIE_NOT_FOUND",
      code: 404,
      message: "Movie with the given ID does not exist.",
    };
  }
  return movie;
};

const fetchMovies = async (filter) => {
  let query = {};

  if (filter.name) {
    query.name = filter.name;
  }

  let movies = await Movie.find(query);
  if (!movies) {
    return {
      err: "MOVIES_NOT_FOUND",
      code: 404,
    };
  }
  return movies;
};

module.exports = { getMovieById, fetchMovies };
