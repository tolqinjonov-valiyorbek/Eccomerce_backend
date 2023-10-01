require("express-async-errors");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const  db_connect_init  = require("./db/db_connect_init");
const app = express();
const port = 5000; // local port that will be running

app.use(express.json()); // to use json
app.use(cors({ orign: "*", credentials: true }));

// Connecting to MongoDB (online)
db_connect_init();


app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .json({ status: "serverError", error: err.toString() });
  }
  next();
});
// Running server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

