const express = require("express");

const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/say-something", controllers.saySomething);

router.post("/getCoords", controllers.getCoords);

module.exports = router;
