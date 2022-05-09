import React, { useEffect, useState } from "react";
import { db } from "../util/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { Heading, VStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";
import CreatePortfolio from "./CreatePortfolio";

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([] | null);

  const currentUserRecoilState = useRecoilValue(currentUserState);

  useEffect(() => {
    if (currentUserRecoilState.isSignedIn) {
      let portfolioDocsRef = collection(
        db,
        "users/" + currentUserRecoilState.uid + "/portfolios"
      );
      return onSnapshot(portfolioDocsRef, (snapshot) => {
        setPortfolios(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [currentUserRecoilState]);

  if (currentUserRecoilState.isSignedIn) {
    return (
      <VStack>
        <Heading>List of portfolios</Heading>
        {portfolios &&
          portfolios.map((portfolio) => (
            <Heading key={portfolio.id} size={"md"}>
              {portfolio.name}
            </Heading>
          ))}
        <CreatePortfolio />
      </VStack>
    );
  } else {
    return null;
  }
};
export default Dashboard;
