import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";
import { addPortfolio } from "../util/firebaseFunctions";
import {
  Box,
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
      <>
        <VStack
          bg={"white"}
          p={{ base: 3, md: 6, xl: 10 }}
          borderRadius="md"
          shadow="md"
        >
          <Box>
            <Heading
              size={"md"}
              marginTop={{ base: 0, md: -2 }}
              marginBottom={2}
            >
              Create portfolio
            </Heading>
          </Box>
          <Container mt={50} centerContent>
            <Input
              mb={2}
              size={"md"}
              width={"100%"}
              placeholder="Portfolio name"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
            />
            <Button onClick={() => handleClick()}>Create</Button>
          </Container>
        </VStack>
      </>
    );
  } else {
    return null;
  }
};

export default CreatePortfolio;
