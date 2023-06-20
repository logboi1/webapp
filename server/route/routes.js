const express = require("express");
const router = express.Router();
const documentRoutes = require("./doocumentRoute");
const paymentRoutes = require("./paymentRoute");
const studentRoutes = require("./studentRoutes");
const courseRoutes = require("./courseRoute");

router.use("/v1", documentRoutes);
router.use("/v1", paymentRoutes);
router.use("/v1", studentRoutes);
router.use("/v1", courseRoutes);

module.exports = router;
