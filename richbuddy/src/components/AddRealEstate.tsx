import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
const AddRealEstate = () => {
  const toast = useToast();
  const [address, setAddress] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = () => {
    toast({
      title: "Company added",
      description: `Added ${squareMeters} of ${address} at $${price}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setAddress("");
    setPrice("");
    setSquareMeters("");
  };

  return (
    <Container>
      <VStack spacing={3}>
        <Heading size={"lg"}> Add Real Estate </Heading>
        <Input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          placeholder="Size in m2"
          value={squareMeters}
          onChange={(e) => setSquareMeters(e.target.value)}
        />
        <Input
          placeholder="Price pr share"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button onClick={handleClick} isFullWidth colorScheme="green">
          Add Asset
        </Button>
      </VStack>
    </Container>
  );
};

export default AddRealEstate;
