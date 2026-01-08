require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const app = express(); // express app object

// Middleware to parse JSON request bodies
app.use(express.json());

const MovieRoutes = require("./routes/movie.routes");
const TheatreRoutes = require("./routes/theatre.routes");
const AuthRoutes = require("./routes/auth.routes");

const PORT = process.env.PORT || 3000;

MovieRoutes(app); // invoking the routes function and passing app object
TheatreRoutes(app);
AuthRoutes(app);

app.listen(PORT, async () => {
  console.log(`Server is Running on ${PORT}`);

  // once server started, call mongoose
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB");

    // test the schema of movie
    /* await Movie.create({
      name: "ABC",
      description: "hkenrjkndf",
      casts: ["H", "A"],
      director: "Tarun",
      trailerUrl: "https://hello.com",
      language: ["Hindi"],
      releaseDate: "18-10-2023",
      releaseStatus: "RELEASED",
    }); */
  } catch (error) {
    console.log("Cannot connect to mongo", error);
  }
}); // first a PORT, second is the callback
