import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
const AddCompany = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = () => {
    toast({
      title: "Company added",
      description: `Added ${amount} of ${name} at $${price}, %${percentage} ownership`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
    setPercentage("");
    setAmount("");
    setPrice("");
  };

  return (
    <Container>
      <VStack spacing={3}>
        <Heading size={"lg"}> Add Company </Heading>
        <Input
          textAlign="start"
          placeholder="Company name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          textAlign="start"
          placeholder="Percentage ownership"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <Input
          textAlign="start"
          placeholder="Amount of shares"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          textAlign="start"
          placeholder="Price pr share"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button onClick={handleClick} isFullWidth colorScheme="pink">
          Add Asset
        </Button>
      </VStack>
    </Container>
  );
};

export default AddCompany;
