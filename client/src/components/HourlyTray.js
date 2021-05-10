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

function HourlyTray(props) {
  return (
    <Box>
      <HStack justify="center">
        <WeatherWrapper>
          <Box py={4} px={3}>
            <HStack spacing={6} textAlign="center">
              <Button rightIcon={<FaArrowCircleLeft />}></Button>
              {props.hourlyData.slice(0, 6).map((hour) => (
                <WeatherWrapper>
                  <Box px={8}>
                    <List spacing={3}>
                      <ListItem>
                        <Text fontSize="lg" fontWeight="500">
                          {new Date(hour.dt * 1000).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                            }
                          )}
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Icon
                          as={weathertoIcon(
                            props.hourlyData[0].weather[0].main
                          )}
                          w={10}
                          h={10}
                        />
                      </ListItem>
                      <ListItem>
                        <Text fontSize="md" fontWeight="500">
                          {k_to_f(hour.temp)}℉
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text fontSize="md" fontWeight="500">
                          {Math.round(hour.pop * 100)}%
                        </Text>
                      </ListItem>
                    </List>
                  </Box>
                </WeatherWrapper>
              ))}
              <Button rightIcon={<FaArrowCircleRight />}></Button>
            </HStack>
          </Box>
        </WeatherWrapper>
      </HStack>
    </Box>
  );
}
export default HourlyTray;
