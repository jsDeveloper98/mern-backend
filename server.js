const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const { PORT, ATLAS_URI } = process.env;

app.use(cors());
app.use(express.json());

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// routes
app.use("/posts", require("./routes/posts"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
