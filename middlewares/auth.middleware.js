const { errResponseBody } = require("../utils/responsebody");

const validateSignUpRequest = async (req, res, next) => {
  try {
    if (
      req.body.username === undefined ||
      req.body.username === null ||
      req.body.username === ""
    ) {
      errResponseBody.error = "Username is required";
      return res.status(400).json(errResponseBody); // client side error
    }
    if (
      req.body.email === undefined ||
      req.body.email === null ||
      req.body.email === ""
    ) {
      errResponseBody.error = "Email is required";
      return res.status(400).json(errResponseBody);
    }
    if (
      req.body.password === undefined ||
      req.body.password === null ||
      req.body.password === ""
    ) {
      errResponseBody.error = "Password is required";
      return res.status(400).json(errResponseBody); // client side error
    }
    next();
  } catch (error) {
    if (error.err) {
      errResponseBody.err = error.err;
      return res.status(error.code).json(errResponseBody);
    }
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

const validateSignInRequest = async (req, res, next) => {
  try {
    if (
      req.body.email === undefined ||
      req.body.email === null ||
      req.body.email === ""
    ) {
      errResponseBody.error = "Email is required";
      return res.status(400).json(errResponseBody);
    }
    if (
      req.body.password === undefined ||
      req.body.password === null ||
      req.body.password === ""
    ) {
      errResponseBody.error = "Password is required";
      return res.status(400).json(errResponseBody);
    }
    next();
  } catch (error) {
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

module.exports = { validateSignUpRequest };
