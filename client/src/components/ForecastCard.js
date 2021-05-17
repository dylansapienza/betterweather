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
  Modal,
  Button,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Lorem,
  ModalFooter,
  Divider,
  SlideFade,
} from "@chakra-ui/react";

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

function ForecastCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
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
      <WeatherWrapper>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {new Date(props.dailydata.dt * 1000)
              .toLocaleTimeString("en-US", {
                weekday: "long",
              })
              .substring(
                0,
                new Date(props.dailydata.dt * 1000)
                  .toLocaleTimeString("en-US", {
                    weekday: "long",
                  })
                  .indexOf(" ")
              )}
          </Text>
          <HStack justifyContent="center">
            <Icon
              as={weathertoIcon(props.dailydata.weather[0])}
              w={24}
              h={24}
            />
          </HStack>
          <HStack justifyContent="center">
            <Text fontSize="2xl" fontWeight="600">
              {props.dailydata.weather[0].main}
            </Text>
          </HStack>
          <HStack justifyContent="center">
            <Text fontSize="5xl" fontWeight="900">
              {k_to_f(props.dailydata.temp.day)}
            </Text>
            <Text fontSize="xl" fontWeight="900">
              ℉
            </Text>
          </HStack>
          <HStack justifyContent="center">
            <Text fontSize="2xl" color="blue.500">
              Lo: {k_to_f(props.dailydata.temp.min)}
            </Text>
            <Text fontSize="2xl" color="orange.500">
              Hi: {k_to_f(props.dailydata.temp.max)}
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            <ListItem>{props.dailydata.uvi} UV Index</ListItem>
            <ListItem>{props.dailydata.humidity}% Humidity</ListItem>
            <ListItem>
              {Math.round(props.dailydata.pop * 100)}% Chance of Precipitation
            </ListItem>
          </List>
          <Box pt={7}>
            <Button
              onClick={() => onOpen()}
              w="full"
              colorScheme="red"
              variant="outline"
            >
              More Data
            </Button>
          </Box>
        </VStack>
      </WeatherWrapper>
    </>
  );
}

export default ForecastCard;
