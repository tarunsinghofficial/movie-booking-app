/* 
    Middlewares related to movie operations can be added here
    
    They are for client request validation, authentication checks, logging, etc.

*/

const badRequestResponse = {
  success: false,
  message: "Bad Request",
  data: {},
  error: "",
};

const validateMovieCreateRequest = (req, res, next) => {
  if (!req.body.name) {
    badRequestResponse.error = "Movie name is required!";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.description) {
    badRequestResponse.error = "Movie description is required";
    return res.status(400).json(badRequestResponse);
  }
  if (
    !req.body.casts ||
    req.body.casts instanceof Array ||
    !req.body.casts.length > 0
  ) {
    badRequestResponse.error = "Movie casts are required";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.trailerUrl) {
    badRequestResponse.error = "Movie trailerUrl is required";
    return res.status(400).json(badRequestResponse);
  }

  if (!req.body.director) {
    badRequestResponse.error = "Movie director is required";
    return res.status(400).json(badRequestResponse);
  }
  if (!req.body.releaseDate) {
    badRequestResponse.error = "Movie releaseDate is required";
    return res.status(400).json(badRequestResponse);
  }

  next();
};

module.exports = {
  validateMovieCreateRequest,
};
