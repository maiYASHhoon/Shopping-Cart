const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const app = express();
app.use(morgan("tiny"));

// db connection
require("./server/db/category");
require("./server/db/product");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// ROUTES
app.use("/", require("./server/routes/product"));
app.use("/", require("./server/routes/category"));
// app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
