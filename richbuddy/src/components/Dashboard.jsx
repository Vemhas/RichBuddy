import React, { useState, useEffect } from "react";
import { db } from "../util/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import AssetList from "./AssetList";
import { Flex, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [realestate, setRealestate] = useState([]);
  const [shares, setShares] = useState([]);

  const dataCollectionCompanies = collection(db, "companies");
  const dataCollectionCryptos = collection(db, "data");
  const dataCollectionRealestate = collection(db, "realestate");
  const dataCollectionShares = collection(db, "shares");

  useEffect(() => {
    const getData = async (databaseRef, setDataInState) => {
      const data = await getDocs(databaseRef);
      setDataInState(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getData(dataCollectionCompanies, setCompanies);
    getData(dataCollectionCryptos, setCryptos);
    getData(dataCollectionRealestate, setRealestate);
    getData(dataCollectionShares, setShares);
  }, [setRealestate, setShares, setCryptos, setCompanies]);

  return (
    <VStack>
      {" "}
      <AssetList th1="Name" th2="Amount" th3="Value" />
    </VStack>
    // <div>
    //   <hr></hr>
    //   {cryptos.map((d) => {
    //     return (
    //       <div>
    //         <p>
    //           {d.name} : {d.amount} : PriceUSD: {d.priceUsd}
    //         </p>
    //       </div>
    //     );
    //   })}
    //   <hr></hr>
    //   {realestate.map((d) => {
    //     return (
    //       <div>
    //         <p>
    //           {d.name} : Revenue: {d.revenue} : Verdi: {d.value}
    //         </p>
    //       </div>
    //     );
    //   })}
    //   <hr></hr>
    //   {shares.map((d) => {
    //     return (
    //       <div>
    //         <p>
    //           {d.name} : Eierandel %: {d.ownershipPercentage} : Verdi: {d.value}
    //         </p>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};
export default Dashboard;
