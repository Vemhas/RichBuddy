import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  VStack,
  AccordionItem,
  AccordionButton,
  Box,
  Heading,
  Flex,
  IconButton,
  Text,
  Tooltip,
  AccordionPanel,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  ViewIcon,
  DeleteIcon,
  LinkIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";
import AddNewAsset from "./AddNewAsset";
import { deletePortfolio } from "../util/firebaseFunctions";

export const PortfolioContentMenu: React.FC<{ portfolioId: string }> = ({
  portfolioId,
}) => {
  const currentUserRecoilState = useRecoilValue(currentUserState);
  const [portfolioData, setPortfolioData] = useState<Array<any>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  useEffect(() => {
    const displayPamphletInfo = async (portfolioId: string) => {
      if (currentUserRecoilState.uid) {
        // await getPortfolioData(pamphletID, uid).then((r) =>
        //   setPortfolioData(r)
        // );
      }
    };

    displayPamphletInfo(portfolioId).catch(console.error);
  }, [currentUserRecoilState]);

  const handleClick_deletePortfolio = async (portfolioId: string) => {
    if (currentUserRecoilState.uid)
      await deletePortfolio(currentUserRecoilState.uid, portfolioId).then(
        (res) => {
          if (res) {
            toast({
              title: "Slettet portfolio " + portfolioId,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Kunne ikke slette portfolio " + portfolioId,
              status: "warning",
              duration: 4000,
              isClosable: true,
            });
          }
        }
      );
  };

  return (
    <>
      <VStack
        bg={"white"}
        p={{ base: 3, md: 6, xl: 10 }}
        borderRadius="md"
        shadow="md"
      >
        <Box>
          <Heading size={"md"} mb={2}>
            Assets
          </Heading>
        </Box>

        <Accordion allowToggle w={"100%"}>
          {portfolioData &&
            portfolioData.map((asset) => [
              <AccordionItem key={asset.id}>
                <Flex
                  align="center"
                  justify={{
                    base: "space-between",
                    md: "space-between",
                    xl: "space-between",
                  }}
                  direction={{ base: "row" }}
                  wrap="nowrap"
                  h={"40px"}
                >
                  <Text fontSize={{ base: 13, sm: 17 }}>{asset.name}</Text>
                  <Box>
                    <Tooltip label="Rediger sang" fontSize="sm">
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="update song"
                        size={"xs"}
                        icon={<EditIcon />}
                        // onClick={() => handleClick_updateSong(song.id)}
                      />
                    </Tooltip>
                    <Tooltip label="Slett sang" fontSize="sm">
                      <IconButton
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Send email"
                        size={"xs"}
                        marginLeft={1}
                        bg={"red.50"}
                        _hover={{ bg: "red.300" }}
                        // onClick={() => {
                        //   setDeleteSongOrPamphlet(song.id);
                        // }}
                        icon={<DeleteIcon />}
                      />
                    </Tooltip>
                  </Box>
                </Flex>
              </AccordionItem>,
            ])}
          <AccordionItem>
            <AccordionButton
              onClick={() => null}
              bg={"green.50"}
              _hover={{ bg: "green.100" }}
            >
              <Box flex={"1"} textAlign={"left"}>
                Legg til asset
              </Box>
              <AddIcon fontSize="10px" marginRight={1} />
            </AccordionButton>
            <AccordionPanel>
              <AddNewAsset />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Flex
          align="center"
          justify={{
            base: "space-between",
            sm: "space-between",
            md: "space-between",
            xl: "space-between",
          }}
          direction={{ base: "column", sm: "row", md: "row", xl: "row" }}
          wrap="nowrap"
          w={"100%"}
          h={{ base: "150px", sm: "100px" }}
          paddingTop={{ base: 4, md: 2 }}
        >
          <Button
            // onClick={redirectToPamphletView}
            w={{ base: "90%" }}
            fontSize={{ base: "sm" }}
            flex={0.3}
            rightIcon={<ViewIcon />}
            bg={"green.200"}
            _hover={{ bg: "green.300" }}
          >
            <a
              // href={linkTopamphlet}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Vis Portfolio
            </a>
          </Button>
          <Button
            // onClick={() => {
            // }}
            w={{ base: "90%" }}
            fontSize={{ base: "sm" }}
            flex={0.3}
            rightIcon={<LinkIcon />}
            bg={"blue.200"}
            _hover={{ bg: "blue.300" }}
          >
            Deling
          </Button>
          <Button
            onClick={() => onOpen()}
            w={{ base: "90%" }}
            fontSize={{ base: "sm" }}
            flex={0.3}
            rightIcon={<DeleteIcon />}
            bg={"red.300"}
            _hover={{ bg: "red.400" }}
          >
            Slett portfolio
          </Button>
          {/* Alert window for Deleting Pamphlet */}

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Slett Portfolio
                </AlertDialogHeader>

                <AlertDialogBody>
                  Er du sikker? Du kan ikke angre denne handlingen.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Avbryt
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      console.log("slettet Portfolio med id: ", portfolioId);
                      handleClick_deletePortfolio(portfolioId).catch(
                        console.error
                      );
                      onClose();
                    }}
                    ml={3}
                  >
                    Slett portfolio
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      </VStack>
    </>
  );
};
