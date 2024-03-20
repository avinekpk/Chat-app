const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log("DB connection error!!!", err.message));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});