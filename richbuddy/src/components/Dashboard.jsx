import React, { useEffect, useState } from "react";
import { db } from "../util/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/store";

import { AddIcon } from "@chakra-ui/icons";
import { PortfolioContentMenu } from "./PortfolioContentMenu";
import CreatePortfolio from "./CreatePortfolio";

const Dashboard = () => {
  const [portfolios, setPortfolios] = useState([] | null);
  const currentUserRecoilState = useRecoilValue(currentUserState);

  useEffect(async () => {
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
      <Container mt={3}>
        <Accordion allowToggle>
          {portfolios &&
            portfolios.map((portfolio) => (
              <AccordionItem key={portfolio.name}>
                <h1>
                  <AccordionButton
                    onClick={() => {
                      console.log("portfolioID", portfolio.id);
                    }}
                    _expanded={{
                      bg: "purple.100",
                      border: "0.2px purple",
                      borderRadius: 5,
                    }}
                  >
                    <Box flex={"1"} textAlign={"left"}>
                      {portfolio.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h1>
                <AccordionPanel>
                  <PortfolioContentMenu portfolioId={portfolio.id} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          <AccordionItem>
            <AccordionButton
              marginTop={5}
              bg={"green.100"}
              _hover={{ bg: "green.200" }}
              _expanded={{
                bg: "green.200",
                border: "0.2px green",
                borderRadius: 5,
              }}
            >
              <Box flex={"1"} textAlign={"left"}>
                Opprett ny portfolio
              </Box>
              <AddIcon fontSize="10px" marginRight={1} />
            </AccordionButton>
            <AccordionPanel>
              <CreatePortfolio />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    );
  } else {
    return null;
  }
};
export default Dashboard;
