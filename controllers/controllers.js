require("dotenv").config({ path: __dirname + "/./../.env" });
const fetch = require("node-fetch");
const request = require("request");
const nodemailer = require("nodemailer");

const ZIPCODEKEY = process.env.ZIPCODEKEY;
const EMAILPASS = process.env.EMAILPASS;

var emails = [
  { email: "*****@gmail.com", zipcode: 11234 },
  { email: "*****@gwu.edu", zipcode: 20001 },
];

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "betterweatherapp@gmail.com",
    pass: EMAILPASS,
  },
});

function k_to_f(kelvin) {
  return parseInt((kelvin - 273.15) * 1.8 + 32);
}

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
        .then((dat) => {
          res.send({ body: dat, name: data.name });
        });
    });
};

module.exports.generateWeatherData = generateWeatherData;

const emailWeather = (req, res) => {
  emails.map((user) => {
    let zipcode = user.zipcode;
    let recipient = user.email;

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
          .then((dat) => {
            console.log(dat.daily[0].temp.day);
            var mailOptions = {
              from: "betterweatherapp@gmail.com",
              to: recipient,
              subject: "Test Message",
              html:
                "<h1>Weather</h1> <br/> <h2> Temperature is " +
                k_to_f(dat.daily[0].temp.day) +
                "</h2>",
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Email Sent: " + info.response);
              }
            });
          });
      });
  });
};

module.exports.emailWeather = emailWeather;
