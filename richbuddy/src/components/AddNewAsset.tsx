import React, { useState } from "react";
import {
  Flex,
  Container,
  VStack,
  Heading,
  Select,
  FormControl,
} from "@chakra-ui/react";
import AddStock from "./AddStock";
import AddCrypto from "./AddCrypto";
import AddCompany from "./AddCompany";
import AddRealEstate from "./AddRealEstate";
import AddSyndicate from "./AddSyndicate";

export const AddNewAsset = () => {
  const [type, setType] = useState("");

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="80vh"
      px={8}
    >
      <Container>
        <VStack spacing={3}>
          <FormControl>
            <Heading textAlign={"center"} paddingBottom={4}>
              Select Asset type
            </Heading>
            <Select
              placeholder="Select asset type"
              size={"lg"}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={"crypto"}>Crypto</option>
              <option value={"realEstate"}>Real Estate</option>
              <option value={"stocks"}>Stocks</option>
              <option value={"company"}>Company</option>
              <option value={"syndicate"}>Syndicate</option>
            </Select>
          </FormControl>
          {type === "crypto" ? (
            <AddCrypto />
          ) : type === "realEstate" ? (
            <AddRealEstate />
          ) : type === "stocks" ? (
            <AddStock />
          ) : type === "company" ? (
            <AddCompany />
          ) : type === "syndicate" ? (
            <AddSyndicate />
          ) : (
            ""
          )}
        </VStack>
      </Container>
    </Flex>
  );
};
