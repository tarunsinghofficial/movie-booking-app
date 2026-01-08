const User = require("../models/user.model");

const createUser = async (data) => {
  try {
    const response = await User.create(data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
    throw error;
  }
};

module.exports = { createUser };
