const express = require("express");
const router = express.Router();

const documentController = require("../controllers/documentController");

// Document Routes
router.post("/documents/upload", documentController.uploadDocument);
router.put("/documents/approve/:id", documentController.approveDocument);

module.exports = router;
