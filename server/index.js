const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual origin URL of your React app
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = 5000;

// Parse JSON request body
app.use(express.json());

// Define routes
app.use("/api", require("./route/userRoutes"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/institute", {
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
