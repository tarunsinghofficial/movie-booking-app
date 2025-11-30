require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const app = express(); // express app object

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is Running on ${PORT}`);

  // once server started, call mongoose
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Cannot connect to mongo", error);
  }
}); // first a PORT, second is the callback
