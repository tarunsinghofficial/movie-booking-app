const authController = require("../controllers/auth.controller");

const routes = (app) => {
  app.post("/mba/api/v1/auth/signup", authController.signup);
  /* app.post("/mba/api/v1/auth/login", authController.login);
  app.post("/mba/api/v1/auth/reset-password", authController.resetPassword); */
};

module.exports = routes;
