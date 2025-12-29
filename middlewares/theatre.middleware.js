const { errResponseBody } = require("../utils/responsebody");

const validateTheatreUpdateRequest = (req, res, next) => {
  if (req.body.insert === undefined) {
    errResponseBody.message =
      "'insert' field is required and should be boolean";
    return res.status(400).json(errResponseBody);
  }

  if (!req.body.movieIds) {
    errResponseBody.message = "'movieIds' field is required";
    return res.status(400).json(errResponseBody);
  }

  if (!(req.body.movieIds instanceof Array)) {
    errResponseBody.message = "expected array of movies but got something else";
    return res.status(400).json(errResponseBody);
  }

  if (req.body.movieIds.length <= 0) {
    errResponseBody.message = "'movieIds' array cannot be empty";
    return res.status(400).json(errResponseBody);
  }
  next();
};

module.exports = { validateTheatreUpdateRequest };
