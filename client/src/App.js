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
import "./App.css";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Weather from "./components/Weather";

function App() {
  const [response, setResponse] = useState("");

  function getResponse() {
    axios.get("/api/v1/say-something").then((res) => {
      setResponse(res.data);
    });
  }

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route path="/weather" component={Weather} />
      <Route path="/about" component={LandingPage} />
    </BrowserRouter>
  );
}

export default App;
