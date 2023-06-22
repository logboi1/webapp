const express = require("express");
const studentRoutes = require("./route/studentRoutes");
const cors = require("cors");
const routes = require("./route/routes");

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual origin URL of your React app
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = 5000;

// Parse JSON request body
app.use(express.json());

// Define routes
app.use("/api", routes);

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/institute", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
