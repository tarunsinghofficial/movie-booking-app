const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  errResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
      error: {},
    });
  } catch (error) {
    console.log("Error in creating movie:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: {},
        error: {
          type: "ValidationError",
          fields: validationErrors,
        },
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating movie",
      data: {},
      error: {},
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);

    if (response.err) {
      return res.status(response.code).json({
        success: false,
        message: response.err,
        data: {},
        error: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie fetched successfully",
      data: response,
      error: {},
    });
  } catch (error) {
    console.log("Error in fetching movie:", error);

    // Handle CastError (invalid ObjectId)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID format. Please provide a valid movie ID.",
        data: {},
        error: {},
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching movie",
      data: {},
      error: {},
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // this is used to return the updated document, else it will return the old doc with just updates applied
      runValidators: true, // this will run the validators defined in the schema on update
    });
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
        data: {},
        error: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
      error: {},
    });
  } catch (error) {
    console.log("Error in updating movie:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: {},
        error: {
          type: "ValidationError",
          fields: validationErrors,
        },
      });
    }

    // Handle CastError (invalid ObjectId)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID format",
        data: {},
        error: {},
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while updating movie",
      data: {},
      error: {},
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.deleteOne({ _id: req.params.id });

    return res.status(200).json(successResponseBody);
  } catch (error) {
    return res.status(500).json(errResponseBody);
  }
};

// we will be using a service function to handle the search logic
const getMovies = async (req, res) => {
  try {
    const movies = await movieService.fetchMovies(req.query);
    if (movies.err) {
      return res.status(movies.code).json({
        success: false,
        message: movies.err,
        data: {},
        error: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      data: movies,
      error: {},
    });
  } catch (error) {
    return res.status(500).json(errResponseBody);
  }
};

module.exports = {
  createMovie,
  updateMovie,
  getMovie,
  getMovies,
  deleteMovie,
};
