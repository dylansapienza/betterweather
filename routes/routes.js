const express = require("express");

const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/say-something", controllers.saySomething);

router.post("/generateWeatherData", controllers.generateWeatherData);

router.get("/emailweather", controllers.emailWeather);

module.exports = router;
