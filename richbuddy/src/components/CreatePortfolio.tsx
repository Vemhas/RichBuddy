import React, {useEffect, useState} from "react"
import {useRecoilValue} from "recoil";
import {currentUserState} from "../store/store";
import {addPortfolio} from "../util/firebaseFunctions";
import {Button, Container, Heading, Input, useToast, VStack} from "@chakra-ui/react";

const CreatePortfolio = () => {
    const [portfolioName, setPortfolioName] = useState("");
    const currentUserRecoilState = useRecoilValue(currentUserState);
    const toast = useToast();

    useEffect( () => {
        console.log("user id create portfolio component: ", currentUserRecoilState.uid)
    }, [currentUserRecoilState])

    const handleClick = async () => {
        if (portfolioName == "" || portfolioName == null) {
            toast({
                title: "Portfolio navn mangler.",
                description: "Portfolio navn kan ikke være tomt.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            if (currentUserRecoilState.isSignedIn) {
                await addPortfolio(portfolioName, currentUserRecoilState.uid).then( (res) => {
                    if (res) {
                        toast({
                            title: "Portfolio opprettet med navn" + portfolioName,
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        })
                    } else {
                        toast({
                            title: "Portfolio navn finnes fra før.",
                            status: "warning",
                            duration: 3000,
                            isClosable: true,
                        })
                    }
                })
            }
        }
    }

    return(
        <Container>
            <VStack spacing={3}>
                <Heading size={"lg"}> Add a portfolio </Heading>
                <Input
                    placeholder="Portfolio name"
                    value={portfolioName}
                    onChange={(e) => setPortfolioName(e.target.value)}
                    />
                <Button onClick={() => handleClick()}>Create portfolio</Button>
            </VStack>
        </Container>
    )
}

export default CreatePortfolio;