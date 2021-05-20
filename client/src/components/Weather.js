import React, { useState, useEffect } from "react";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import EnterZipcode from "./EnterZipcode";
import WeatherReport from "./WeatherReport";

function Weather() {
  const [isOpen, onToggle] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [zipcode, setZipcode] = useState();
  const [name, setName] = useState("");
  return (
    <>
      {weatherData ? (
        <WeatherReport
          weatherData={weatherData}
          zipcode={zipcode}
          name={name}
        />
      ) : (
        <ScaleFade initialScale={0.9} in={isOpen}>
          <EnterZipcode
            submit={onToggle}
            setName={setName}
            setWeatherData={setWeatherData}
            setZipcode={setZipcode}
          />
        </ScaleFade>
      )}
    </>
  );
}

export default Weather;
