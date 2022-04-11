import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { db } from "./util/firebase-config.ts";
import { collection, getDocs } from "firebase/firestore";
import { ChakraProvider } from "@chakra-ui/react";
import { AddNewAsset } from "./components/AddNewAsset";
import FirebaseSignIn from "./components/FirebaseSignIn";
import Navbar from "./components/Navbar";

function App() {
  // const [companies, setCompanies] = useState([]);
  // const [cryptos, setCryptos] = useState([]);
  // const [realestate, setRealestate] = useState([]);
  // const [shares, setShares] = useState([]);
  //
  // const dataCollectionCompanies = collection(db, "companies");
  // const dataCollectionCryptos = collection(db, "data");
  // const dataCollectionRealestate = collection(db, "realestate");
  // const dataCollectionShares = collection(db, "shares");
  //
  // useEffect(() => {
  //   const getData = async (databaseRef, setData) => {
  //     const data = await getDocs(databaseRef);
  //     setData(
  //       data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }))
  //     );
  //   };
  //   getData(dataCollectionCompanies, setCompanies);
  //   getData(dataCollectionCryptos, setCryptos);
  //   getData(dataCollectionRealestate, setRealestate);
  //   getData(dataCollectionShares, setShares);
  // }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FirebaseSignIn />} />
          <Route path="/add" element={<AddNewAsset />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
