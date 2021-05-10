import React, { useState, useEffect, ReactNode } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

function k_to_f(kelvin) {
  return parseInt((kelvin - 273.15) * 1.8 + 32);
}

function HourlyData(props) {
  return (
    <Table variant="striped" size="sm">
      <TableCaption>Data Provided by OpenWeatherMap</TableCaption>
      <Thead>
        <Tr>
          <Th>Time</Th>
          <Th>Temp</Th>
          <Th>Precip</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.hourlyData.slice(0, 13).map((hour) => (
          <Tr>
            <Td>
              {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                hour: "numeric",
              })}
            </Td>
            <Td>{k_to_f(hour.temp)}℉</Td>
            <Td>{Math.round(hour.pop * 100)}%</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default HourlyData;
