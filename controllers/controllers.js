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

const getCoords = (req, res) => {
  console.log("HI");

  var zipcode = req.body.zipcode;

  request(
    `https://thezipcodes.com/api/v1/search?zipCode=${zipcode}&countryCode=US&apiKey=${ZIPCODEKEY}`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(body);
      JSON.parse(body);
      console.log(body.location.latitude);
      console.log(body.location.longitude);
    }
  );

  fetch(
    `https://www.zipcodeapi.com/rest/${ZIPCODEKEY}/info.json/${zipcode}/degrees`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json({
        body: data,
      });
      console.log(data);
    });
};

module.exports.getCoords = getCoords;
