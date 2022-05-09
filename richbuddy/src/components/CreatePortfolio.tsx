import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";
import { addPortfolio } from "../util/firebaseFunctions";
import {
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";

const CreatePortfolio = () => {
  const [portfolioName, setPortfolioName] = useState("");
  const currentUserRecoilState = useRecoilValue(currentUserState);
  const toast = useToast();

  const handleClick = async () => {
    if (portfolioName == "" || portfolioName == null) {
      toast({
        title: "Portfolio name missing",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      if (currentUserRecoilState.isSignedIn) {
        await addPortfolio(portfolioName, currentUserRecoilState.uid).then(
          (res) => {
            if (res) {
              toast({
                title: "Portfolio created: " + portfolioName,
                status: "success",
                duration: 4000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Portfolio already exist",
                status: "warning",
                duration: 4000,
                isClosable: true,
              });
            }
          }
        );
      }
    }
  };
  if (currentUserRecoilState.isSignedIn) {
    return (
      <Container pt={10}>
        <VStack spacing={3}>
          <Heading size={"lg"}> Add a portfolio </Heading>
          <Input
            placeholder="Portfolio name"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
          />
          <Button onClick={() => handleClick()}>Create portfolio</Button>
        </VStack>
      </Container>
    );
  } else {
    return null;
  }
};

export default CreatePortfolio;
