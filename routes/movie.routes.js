// This will have all movie-related routes, with resource as /movies, including CRUD operations

/* 

In the 

app.post("url", callback controller), the controller will have two parameters, req and res.

req: request from client to server
res: response from server to client

*/

const MovieController = require("../controllers/movie.controller").createMovie;

const routes = (app) => {
  // routes function takes exporess app object as parameter

  app.post("/mba/api/v1/movies", MovieController);
};

module.exports = routes;
