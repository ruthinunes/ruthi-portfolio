const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routerUrls = require("./routes/routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", routerUrls);

dotenv.config();

app.listen(port, () => {
  mongoose.connect(process.env.DB_ACCESS, console.log("DATA BASE CONNECTED"));
  console.log(`Server is running on port: ${port}`);
});
