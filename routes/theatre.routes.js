const TheatreController = require("../controllers/theatre.controller");
const TheatreMiddleware = require("../middlewares/theatre.middleware");

const routes = (app) => {
  // routes function takes exporess app object as parameter

  app.post("/mba/api/v1/theatres", TheatreController.createTheatre);

  // this will fetch all theatres, and you may use query params to filter the theatres running a specific movie
  app.get("/mba/api/v1/theatres", TheatreController.getTheatres);

  // this will fetch all movies running in a specific theatre by id- http://localhost:3000/mba/api/v1/theatres/693281b29bf63c160984dc46/movies
  app.get(
    "/mba/api/v1/theatres/:id/movies",
    TheatreController.getMoviesInTheatre
  );

  // this will fetch a specific theatre by id
  app.get("/mba/api/v1/theatres/:id", TheatreController.getTheatre);

  // this will update a specific theatre by id
  app.put("/mba/api/v1/theatres/:id", TheatreController.updateTheatre);

  // this will delete a specific theatre by id
  app.delete("/mba/api/v1/theatres/:id", TheatreController.deleteTheatre);

  // this will update the movies running in a specific theatre by id
  app.patch(
    "/mba/api/v1/theatres/:id/movies",
    TheatreMiddleware.validateTheatreUpdateRequest,
    TheatreController.updateMoviesInTheatre
  );
};

module.exports = routes;
