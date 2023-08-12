const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

const urlListRouters = require("./routes/urlList");

// midlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// handle all routes here
app.use("/api/shorturl", urlListRouters);



// connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen to app

    app.listen(process.env.PORT, () => {
      console.log(`listening to app on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      "An error occured while trying to connet to the database: ",
      error
    );
  });
