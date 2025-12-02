const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  errResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log("Error in creating movie", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json(errResponseBody);
    }

    // Handle other errors
    return res.status(500).json(errResponseBody);
  }
};

const getMovie = async (req, res) => {
  try {
    //const movie = await Movie.findById(req.params.id); // if the id is not valid, it should verify

    const response = await movieService.getMovieById(req.params.id);

    if (response.err) {
      errResponseBody.err = response.err;
      return res.status(response.code).json(errResponseBody);
    }

    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    return res.status(500).json(errResponseBody);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).json(successResponseBody);
  } catch (error) {
    return res.status(500).json(errResponseBody);
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
        data: {},
        error: {},
      });
    }
    return res.status(200).json(successResponseBody);
  } catch (error) {
    return res.status(500).json(errResponseBody);
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

module.exports = {
  createMovie,
  updateMovie,
  getMovie,
  getAllMovies,
  deleteMovie,
};
