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
        <Tr>
          <Td>1 PM</Td>
          <Td>62℉</Td>
          <Td>12%</Td>
        </Tr>
        <Tr>
          <Td>2 PM</Td>
          <Td>65℉</Td>
          <Td>10%</Td>
        </Tr>
        <Tr>
          <Td>3 PM</Td>
          <Td>67℉</Td>
          <Td>8%</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default HourlyData;
