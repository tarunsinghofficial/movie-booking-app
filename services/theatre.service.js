const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

const getTheatreById = async (id) => {
  const theatre = await Theatre.findById(id);

  if (!theatre) {
    return {
      err: "THEATRE_NOT_FOUND",
      code: 404,
      message: "Theatre with the given ID does not exist.",
    };
  }
  return theatre;
};

const getAllTheatres = async (data) => {
  let query = {};

  if (data && data.city) {
    query.city = data.city;
  }
  if (data && data.pinCode) {
    query.pinCode = data.pinCode;
  }
  if (data && data.name) {
    query.name = data.name;
  }

  // get all theatres running a specific movie-- http://localhost:3000/mba/api/v1/theatres?movieId=693281839bf63c160984dc3c&city=Pune
  if (data && data.movieId) {
    let movie = await Movie.findById(data.movieId); // fetched the movie object from db
    query.movies = { $all: movie }; // inside our query object, we are adding a new field called movies, and we are setting it to the movie object (with key value pair). $all is a mongodb operator that matches all the values in the array.
  }

  const response = await Theatre.find(query, {});
  return response;
};

const getAllMoviesInTheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(id, {
      name: 1, // 1 means include this field in the response, 0 means exclude this field from the response
      city: 1,
      address: 1,
      pinCode: 1,
    }).populate("movies"); // findById(id) return all the theatre details including the movies array but not the movie details, as for that we need to populate the movies array

    if (!theatre) {
      return {
        err: "THEATRE_NOT_FOUND",
        code: 404,
        message: "Theatre with the given ID does not exist.",
      };
    }
    return theatre;
  } catch (error) {
    console.log("Error in fetching all movies in theatre:", error);
    return {
      err: "ERROR_IN_FETCHING_ALL_MOVIES_IN_THEATRE",
      code: 500,
      message: "Error in fetching all movies in theatre",
    };
  }
};

const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
  /* const theatre = await Theatre.findById(theatreId);

  if (!theatre) {
    return {
      err: "THEATRE_NOT_FOUND",
      code: 404,
      message: "Theatre with the given ID does not exist.",
    };
  } */

  if (insert) {
    // Add movie IDs to the theatre's movies array
    /* movieIds.forEach((movieId) => {
      theatre.movies.push(movieId);
    }); */

    await Theatre.updateOne(
      { _id: theatreId },
      { $addToSet: { movies: { $each: movieIds } } }
    );
  } else {
    // Remove movie IDs from the theatre's movies array
    /* let savedMovies = theatre.movies;
    movieIds.forEach((movieId) => {
      savedMovies = savedMovies.filter(
        (savedMovieId) => savedMovieId == movieId
      );
    });
    theatre.movies = savedMovies; */

    await Theatre.updateOne(
      { _id: theatreId },
      { $pull: { movies: { $in: movieIds } } }
    );
  }
  //await theatre.save(); // save the updated theatre document in db, else it will run in js memory only

  const theatre = await Theatre.findById(theatreId);

  return theatre.populate("movies"); // if return as theatre, it will return the updated theatre object, use theatre.populate('movies') if u want movie details
};

module.exports = {
  getTheatreById,
  updateMoviesInTheatre,
  getAllTheatres,
  getAllMoviesInTheatre,
};
