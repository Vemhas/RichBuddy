import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
const AddSyndicate = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = () => {
    toast({
      title: "Syndicate added",
      description: `Added ${amount} of ${name} at $${price}, %${percentage} ownership`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container>
      <VStack spacing={3}>
        <Heading size={"lg"}> Add Syndicate </Heading>
        <Input
          placeholder="Syndicate name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Percentage ownership"
          onChange={(e) => setPercentage(e.target.value)}
        />
        <Input
          placeholder="Amount of shares"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Price pr share"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Total project value"
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        <Input
          placeholder="Debt financing"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Net yield"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Cashflow"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Dividend percentage"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button onClick={handleClick} isFullWidth colorScheme="green">
          Add Asset
        </Button>
      </VStack>
    </Container>
  );
};

export default AddSyndicate;
