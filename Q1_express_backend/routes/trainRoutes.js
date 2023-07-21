const express = require("express");
const router = express.Router();
const {
  getTrains,
  getTrain,
} = require("../controllers/trainController");
router.route("/").get(getTrains);
router.route("/:id").get(getTrain);

module.exports = router;
