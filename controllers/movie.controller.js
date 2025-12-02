const Movie = require("../models/movie.model");

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
    console.log("Error in creating movie", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        data: {},
        error: error,
        message: "Validation failed: Please provide all required fields",
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      data: {},
      error: error,
      message: "Some internal error while creating movie",
    });
  }
};

module.exports = { createMovie };
