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
  const [todayHourly, setTodayHourly] = useState(false);

  return (
    <>
      <Box py={12}>
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
          <WeatherWrapper>
            <Collapse startingHeight={445} in={todayHourly}>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  {threedays[0]}
                </Text>
                <HStack justifyContent="center">
                  <Icon
                    as={weathertoIcon(props.weatherData.daily[0].weather[0])}
                    w={24}
                    h={24}
                  />
                </HStack>
                <HStack justifyContent="center">
                  <Text fontSize="2xl" fontWeight="600">
                    {props.weatherData.daily[0].weather[0].main}
                  </Text>
                </HStack>
                <HStack justifyContent="center">
                  <Text fontSize="5xl" fontWeight="900">
                    {k_to_f(props.weatherData.daily[0].temp.day)}
                  </Text>
                  <Text fontSize="xl" fontWeight="900">
                    ℉
                  </Text>
                </HStack>
                <HStack justifyContent="center">
                  <Text fontSize="2xl" color="blue.500">
                    Lo: {k_to_f(props.weatherData.daily[0].temp.min)}
                  </Text>
                  <Text fontSize="2xl" color="orange.500">
                    Hi: {k_to_f(props.weatherData.daily[0].temp.max)}
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>{props.weatherData.daily[0].uvi} UV Index</ListItem>
                  <ListItem>
                    {props.weatherData.daily[0].humidity}% Humidity
                  </ListItem>
                  <ListItem>
                    {Math.round(props.weatherData.daily[0].pop * 100)}% Chance
                    of Precipitation
                  </ListItem>
                </List>
              </VStack>
              <Divider colorScheme="blackAlpha" />
              <Box py={4} px={4} bg={useColorModeValue("gray.50", "gray.700")}>
                <HStack justifyContent="left">
                  <Text fontSize="xl" fontWeight="500">
                    Hourly Forecast
                  </Text>
                </HStack>
                <HStack justifyContent="left">
                  <HourlyData hourlyData={props.weatherData.hourly} />
                  {/* <List spacing={5} textAlign="start" px={1}>
                    <ListItem>
                      <Box
                        py={4}
                        px={1}
                        bg={useColorModeValue("white", "white")}
                      >
                        {new Date(
                          props.weatherData.hourly[0].dt * 1000
                        ).toLocaleTimeString("en-US", { hour: "numeric" })}
                        {":  "}
                        {k_to_f(props.weatherData.hourly[0].temp)}
                      </Box>
                    </ListItem>
                    <ListItem>2pm</ListItem>
                    <ListItem>3pm</ListItem>
                  </List> */}
                </HStack>
              </Box>
            </Collapse>

            <Button
              onClick={() => {
                setTodayHourly(!todayHourly);
              }}
              w="full"
              colorScheme="grey"
              variant="outline"
            >
              More Data
            </Button>
          </WeatherWrapper>

          <WeatherWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                {threedays[1]}
              </Text>
              <HStack justifyContent="center">
                <Icon
                  as={weathertoIcon(props.weatherData.daily[1].weather[0])}
                  w={24}
                  h={24}
                />
              </HStack>
              <HStack justifyContent="center">
                <Text fontSize="2xl" fontWeight="600">
                  {props.weatherData.daily[1].weather[0].main}
                </Text>
              </HStack>
              <HStack justifyContent="center">
                <Text fontSize="5xl" fontWeight="900">
                  {k_to_f(props.weatherData.daily[1].temp.day)}
                </Text>
                <Text fontSize="xl" fontWeight="900">
                  ℉
                </Text>
              </HStack>
              <HStack justifyContent="center">
                <Text fontSize="2xl" color="blue.500">
                  Lo: {k_to_f(props.weatherData.daily[1].temp.min)}
                </Text>
                <Text fontSize="2xl" color="orange.500">
                  Hi: {k_to_f(props.weatherData.daily[1].temp.max)}
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>{props.weatherData.daily[1].uvi} UV Index</ListItem>
                <ListItem>
                  {props.weatherData.daily[1].humidity}% Humidity
                </ListItem>
                <ListItem>
                  {props.weatherData.daily[1].pop * 100}% Chance of
                  Precipitation
                </ListItem>
              </List>
              <Box pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  More Data
                </Button>
              </Box>
            </VStack>
          </WeatherWrapper>

          <WeatherWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                {threedays[2]}
              </Text>
              <HStack justifyContent="center">
                <Icon
                  as={weathertoIcon(props.weatherData.daily[2].weather[0])}
                  w={24}
                  h={24}
                />
              </HStack>
              <HStack justifyContent="center">
                <Text fontSize="2xl" fontWeight="600">
                  {props.weatherData.daily[2].weather[0].main}
                </Text>
              </HStack>
              <HStack justifyContent="center">
                <Text fontSize="5xl" fontWeight="900">
                  {k_to_f(props.weatherData.daily[2].temp.day)}
                </Text>
                <Text fontSize="xl" fontWeight="900">
                  ℉
                </Text>
              </HStack>
              <HStack justifyContent="center">
                <Text fontSize="2xl" color="blue.500">
                  Lo: {k_to_f(props.weatherData.daily[2].temp.min)}
                </Text>
                <Text fontSize="2xl" color="orange.500">
                  Hi: {k_to_f(props.weatherData.daily[2].temp.max)}
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>{props.weatherData.daily[2].uvi} UV Index</ListItem>
                <ListItem>
                  {props.weatherData.daily[2].humidity}% Humidity
                </ListItem>
                <ListItem>
                  {props.weatherData.daily[2].pop * 100}% Chance of
                  Precipitation
                </ListItem>
              </List>
              <Box pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  More Data
                </Button>
              </Box>
            </VStack>
          </WeatherWrapper>
        </Stack>
      </Box>
      <HourlyTray hourlyData={props.weatherData.hourly} />
    </>
  );
}

export default WeatherReport;
