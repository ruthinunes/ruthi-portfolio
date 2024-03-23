const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routerUrls = require("./routes/routes");

app.use(express.json());

// Update CORS configuration to include the necessary headers
app.use(cors({
  origin: "*", // Change this to your actual domain in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  exposedHeaders: "Access-Control-Allow-Origin, Access-Control-Allow-Credentials",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400,
  // Add the Access-Control-Allow-Private-Network header
  exposedHeaders: "Access-Control-Allow-Private-Network",
}));

app.use("/api", routerUrls);

dotenv.config();

app.listen(port, () => {
  mongoose.connect(process.env.DB_ACCESS, console.log("DATA BASE CONNECTED"));
  console.log(`Server is running on port: ${port}`);
});
