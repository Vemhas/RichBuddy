import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../util/firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Links = [
  { title: "Dashboard", url: "/" },
  {
    title: "Add asset",
    url: "/add",
  },
];

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setDisplayName(user.displayName!);
        setPhotoURL(user.photoURL!);
      } else {
        setUid("");
        setDisplayName("");
        setPhotoURL("");
      }
    });
  }, [uid, photoURL, displayName, setUid, setDisplayName, setPhotoURL]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Asset dashboard 0.1</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <Link key={link.title}>
                <Button variant="nav" onClick={() => navigate(link.url)}>
                  {link.title}
                </Button>
              </Link>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={photoURL} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={photoURL} />
                  </Center>
                  <br />
                  <Center>
                    <p>{displayName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => signOut(auth)}>Sign-out</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
