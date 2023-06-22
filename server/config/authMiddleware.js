const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);
    // Add the decoded user data to the request object
    req.user = decoded.user;
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { authMiddleware };
