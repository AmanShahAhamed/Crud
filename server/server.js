const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const empRoute = require("./routes/empRoute");

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3000;
const mongoUrlString = process.env.MONGOURL;

//mongoose connection
mongoose.connect(mongoUrlString);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", empRoute);

//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
