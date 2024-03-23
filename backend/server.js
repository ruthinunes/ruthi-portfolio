const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routerUrls = require("./routes/routes");

app.use(express.json());
app.use(cors());
app.use("/api", routerUrls);
dotenv.config();

app.listen(port, () => {
  mongoose.connect(process.env.DB_ACCESS, console.log("DATA BASE CONNECTED"));
  console.log(`Server is running on port: ${port}`);
});
