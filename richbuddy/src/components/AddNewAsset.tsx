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
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";
import SignIn from "./SignIn";

const AddNewAsset: React.FC<{ portfolioId: string }> = ({ portfolioId }) => {
  const [type, setType] = useState("");
  const currentUserRecoilState = useRecoilValue(currentUserState);

  if (currentUserRecoilState.isSignedIn) {
    return (
      <Flex
        align="center"
        justify={{ base: "start", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="nowrap"
        px={8}
        mb={10}
      >
        <Container>
          <VStack spacing={3}>
            <FormControl>
              <Heading size={"md"} textAlign={"center"} paddingBottom={4}>
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
              <AddCrypto pId={portfolioId} />
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
  } else {
    return <SignIn />;
  }
};
export default AddNewAsset;
