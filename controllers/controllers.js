const saySomething = (req, res) => {
  res.status(200).json({
    body: "Hello from the server!",
  });
};

module.exports.saySomething = saySomething;

const getCoords = (req, res) => {
  zipcode = req.zipcode;
  fetch(
    `https://www.zipcodeapi.com/rest/${API_KEY}/info.json/${zipcode}/degrees`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};

module.exports.getCoords = getCoords;
