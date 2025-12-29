const Theatre = require("../models/theatre.model");
const {
  errResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

const theatreService = require("../services/theatre.service");

const createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body); // we may also use service layer here

    successResponseBody.data = theatre;
    successResponseBody.message = "Theatre created successfully";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log("Error in creating theatre:", error);

    errResponseBody.message = "Error in creating theatre";
    errResponseBody.error = error;
    return res.status(500).json(errResponseBody);
  }
};

const getTheatres = async (req, res) => {
  try {
    const theatres = await theatreService.getAllTheatres(req.query);
    successResponseBody.data = theatres;
    successResponseBody.message = "Theatres fetched successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in fetching theatres:", error);

    errResponseBody.message = "Error in fetching theatres";
    errResponseBody.error = error;
    return res.status(500).json(errResponseBody);
  }
};

const getTheatre = async (req, res) => {
  try {
    const theatre = await theatreService.getTheatreById(req.params.id);

    if (theatre.err) {
      errResponseBody.message = theatre.message;
      return res.status(theatre.code).json(errResponseBody);
    }
    successResponseBody.data = theatre;
    successResponseBody.message = "Theatre fetched successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in fetching theatre:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      errResponseBody.message = "Invalid theatre ID format";
      return res.status(400).json(errResponseBody);
    }

    errResponseBody.message = "Error in fetching theatre";
    errResponseBody.error = error;
    return res.status(500).json(errResponseBody);
  }
};

const getMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.getAllMoviesInTheatre(req.params.id);
    if (response.err) {
      errResponseBody.message = response.message;
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Movies fetched successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in fetching movies in theatre:", error);
    errResponseBody.message = "Error in fetching movies in theatre";
    errResponseBody.error = error;
    return res.status(500).json(errResponseBody);
  }
};

const updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!theatre) {
      errResponseBody.message = "Theatre with the given ID does not exist.";
      return res.status(404).json(errResponseBody);
    }
    successResponseBody.data = theatre;
    successResponseBody.message = "Theatre updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in updating theatre:", error);
    errResponseBody.message = "Error in updating theatre";
    errResponseBody.error = error;
    return res.status(500).json(errResponseBody);
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.id);

    if (!theatre) {
      errResponseBody.message = "Theatre with the given ID does not exist.";
      return res.status(404).json(errResponseBody);
    }
    successResponseBody.data = theatre;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in deleting theatre:", error);
    errResponseBody.message = "Error in deleting theatre";
    errResponseBody.error = error;
    return res.status(500).json(errResponseBody);
  }
};

const updateMoviesInTheatre = async (req, res) => {
  try {
    const response = await theatreService.updateMoviesInTheatre(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    );

    if (response.err) {
      errResponseBody.message = response.message;
      return res.status(response.code).json(errResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Movies updated in theatre successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log("Error in updating movies in theatre:", error);
    errResponseBody.error = error;
    errResponseBody.message = "Error in updating movies in theatre";
    return res.status(500).json(errResponseBody);
  }
};

module.exports = {
  createTheatre,
  getTheatres,
  getTheatre,
  updateTheatre,
  deleteTheatre,
  updateMoviesInTheatre,
  getMoviesInTheatre,
};
