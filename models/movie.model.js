const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Movie name must be at least 3 characters long"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "Movie description must be at least 10 characters long"],
      trim: true,
    },
    casts: {
      type: [String],
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: [String],
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
      minLength: [2, "Director name must be at least 2 characters long"],
      trim: true,
    },
    releaseStatus: {
      type: String,
      required: true,
      default: "RELEASED",
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema); //creates a new Model

module.exports = Movie; // return the model
