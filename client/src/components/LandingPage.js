import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";

function LandingPage() {
  return (
    <div className="App">
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "5xl", sm: "5xl", md: "7xl" }}
            lineHeight={"110%"}
          >
            Weather insights{" "}
            <Text as={"span"} color={"orange.400"}>
              delivered daily
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Never forget your umbrella. Open and clear weather information
            presented to you in ad-free.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Button
              onClick={() => {
                window.location.replace("/weather");
              }}
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
            >
              Get started
            </Button>
            <Button
              onClick={() => {
                window.location.replace("/about");
              }}
              rounded={"full"}
              px={6}
            >
              Learn more
            </Button>
          </Stack>
          <Flex w={"full"}></Flex>
        </Stack>
      </Container>
    </div>
  );
}

export default LandingPage;
