const userService = require("../services/user.service");
const {
  successResponseBody,
  errResponseBody,
} = require("../utils/responsebody");

const signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully registered a user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errResponseBody.err = error.err;
      return res.status(error.code).json(errResponseBody);
    }
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

module.exports = { signup };
