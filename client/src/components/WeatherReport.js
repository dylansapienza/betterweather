import React, { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Icon,
  Image,
  useDisclosure,
  Collapse,
  Lorem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Divider,
  SlideFade,
} from "@chakra-ui/react";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaCheckCircle,
} from "react-icons/fa";
import WeatherIcons from "./WeatherIcons";
import Weather from "./Weather";
import HourlyData from "./HourlyData";
import HourlyTray from "./HourlyTray";
import ForecastCard from "./ForecastCard";

var d = new Date();

//Assigning Day of Week
var weekdays = new Array();
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
var n = d.getUTCDay();
var threedays = new Array();
threedays[0] = weekdays[n];
threedays[1] = weekdays[(n + 1) % 7];
threedays[2] = weekdays[(n + 2) % 7];

//Assigning Day of Month

function k_to_f(kelvin) {
  return parseInt((kelvin - 273.15) * 1.8 + 32);
}

function weathertoIcon(weather) {
  console.log(weather.main);
  if (weather.main === "Rain" || weather.main === "Drizzle")
    return WeatherIcons.rain;

  if (weather.main === "Thunderstorm") return WeatherIcons.storm;
  if (weather.main === "Clear") return WeatherIcons.sunny;
  if (weather.main === "Snow") return WeatherIcons.snow;
  if (weather.main === "Clouds" && (weather.id === 801 || weather.id === 802))
    return WeatherIcons.partlycloudy;
  else return WeatherIcons.cloudy;

  return WeatherIcons.notFound;
}

function WeatherWrapper({ children }) {
  return (
    <Box
      mb={0}
      shadow="base"
      borderWidth="2px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"2xl"}
    >
      {children}
    </Box>
  );
}

function WeatherReport(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box py={12}>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Lorem count={2} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button onClick={() => onOpen()}>Open Modal</Button>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Weather in {props.zipcode}
          </Heading>
          <Text fontSize="lg" color={"gray.500"}></Text>
        </VStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <ForecastCard dailydata={props.weatherData.daily[0]} />
          <ForecastCard dailydata={props.weatherData.daily[1]} />
          <ForecastCard dailydata={props.weatherData.daily[2]} />
          <ForecastCard dailydata={props.weatherData.daily[3]} />
        </Stack>
      </Box>
      <HourlyTray hourlyData={props.weatherData.hourly} />
    </>
  );
}

export default WeatherReport;
