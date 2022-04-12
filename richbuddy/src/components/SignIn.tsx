// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "../util/firebase-config";
import { Container, Flex, VStack, Heading } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import {
  currentUserDisplayName,
  currentUserphotoURL,
  currentUserUid,
} from "../store/store";

// Configure Firebase.
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [uid, setUid] = useRecoilState(currentUserUid);
  const [displayName, setDisplayName] = useRecoilState(currentUserDisplayName);
  const [photoURL, setPhotoURL] = useRecoilState(currentUserphotoURL);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        if (user) {
          //Trying to use a type guard:
          const dName: string =
            user.displayName !== null
              ? user.displayName
              : "no displayname returned";
          setUid(user.uid);
          //Kommentert ut pga TS-ERROR
          // setDisplayName(dName);
          // setPhotoURL(user.photoURL);
        } else {
          // User is signed out.
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="nowrap"
        minH="20vh"
        px={8}
      >
        <Container>
          <VStack spacing={3}>
            <Heading size={"lg"}>Register or log in:</Heading>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </VStack>
        </Container>
      </Flex>
    );
  }
  return (
    <VStack>
      <Heading size={"lg"}>
        Welcome {firebase.auth().currentUser?.displayName}
      </Heading>
    </VStack>
  );
}

export default SignInScreen;
