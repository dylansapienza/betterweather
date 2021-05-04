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

function Weather() {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <ScaleFade initialScale={0.9} in={isOpen}>
        <EnterZipcode submit={onToggle} />
      </ScaleFade>
    </>
  );
}

export default Weather;
