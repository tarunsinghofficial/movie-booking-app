const errResponseBody = {
  success: false,
  data: {},
  error: {},
  message: "Some internal error while fetching data",
};

const successResponseBody = {
  success: true,
  data: {},
  error: {},
  message: "Successfully fetched data",
};

module.exports = { errResponseBody, successResponseBody };
