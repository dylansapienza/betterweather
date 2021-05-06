require("dotenv").config({ path: __dirname + "/./../.env" });
const fetch = require("node-fetch");
const request = require("request");

const ZIPCODEKEY = process.env.ZIPCODEKEY;

const saySomething = (req, res) => {
  res.status(200).json({
    body: "Hello from the server!",
  });
};

module.exports.saySomething = saySomething;

const generateWeatherData = (req, res) => {
  var zipcode = req.body.zipcode;
  console.log("hi");

  fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${ZIPCODEKEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.lat);
      console.log(data.lon);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude={part}&appid=${ZIPCODEKEY}`
      )
        .then((re) => re.json())
        .then(async (dat) => {
          res.send({ body: await dat });
          console.log(dat);
        });
    });
};

module.exports.generateWeatherData = generateWeatherData;
