// This will have all movie-related routes, with resource as /movies, including CRUD operations

/* 

In the 

app.post("url", callback controller), the controller will have two parameters, req and res.

req: request from client to server
res: response from server to client

*/

const MovieController = require("../controllers/movie.controller");
const MovieMiddlewares = require("../middlewares/movie.middleware");

const routes = (app) => {
  // routes function takes exporess app object as parameter

  app.post(
    "/mba/api/v1/movies",
    MovieMiddlewares.validateMovieCreateRequest,
    MovieController.createMovie
  );
  app.get("/mba/api/v1/movies/:id", MovieController.getMovie);
  app.put("/mba/api/v1/movies/:id", MovieController.updateMovie);
  app.delete("/mba/api/v1/movies/:id", MovieController.deleteMovie);

  app.get("/mba/api/v1/movies", MovieController.getMovies);
};

module.exports = routes;
