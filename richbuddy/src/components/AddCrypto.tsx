import React, { useState } from "react";
import {
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { addNewAsset } from "../util/firebaseFunctions";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";

const AddCrypto: React.FC<{ pId: string }> = (pId) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const currentUserRecoilState = useRecoilValue(currentUserState);

  const handleClick = async () => {
    await addNewAsset(currentUserRecoilState.uid, pId.pId, name).then(() => {
      console.log("uid ", currentUserRecoilState.uid, "portfolioId: ", pId);
      toast({
        title: "Crypto added",
        description: `Added ${amount} of ${name}//${ticker} at $${price}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setName("");
      setAmount("");
      setPrice("");
      setTicker("");
    });
  };

  return (
    <Container>
      <VStack spacing={3}>
        <Heading size={"lg"}> Add Crypto Asset </Heading>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <Input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Price pr coin"
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

export default AddCrypto;
