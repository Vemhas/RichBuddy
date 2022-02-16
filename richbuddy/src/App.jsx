import React, { useState, useEffect } from "react";
import "./App.css";
import { db, signInWithGoogle } from "./util/firebase-config.ts";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [companies, setCompanies] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [realestate, setRealestate] = useState([]);
  const [shares, setShares] = useState([]);

  const dataCollectionCompanies = collection(db, "companies");
  const dataCollectionCryptos = collection(db, "data");
  const dataCollectionRealestate = collection(db, "realestate");
  const dataCollectionShares = collection(db, "shares");

  // SWR react hook for datafetching
  // react-firebase-hooks datafetching

  useEffect(() => {
    const getData = async (databaseRef, setData) => {
      const data = await getDocs(databaseRef);
      setData(
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
  }, []);

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      {companies.map((d) => {
        return (
          <div>
            <p>
              Ticker: {d.ticker} : Shares: {d.shares}
            </p>
          </div>
        );
      })}
      <hr></hr>
      {cryptos.map((d) => {
        return (
          <div>
            <p>
              Name: {d.name} : Amount: {d.amount} : PriceUSD: {d.priceUsd}
            </p>
          </div>
        );
      })}
      <hr></hr>
      {realestate.map((d) => {
        return (
          <div>
            <p>
              Name: {d.name} : Revenue: {d.revenue} : Verdi: {d.value}
            </p>
          </div>
        );
      })}
      <hr></hr>
      {shares.map((d) => {
        return (
          <div>
            <p>
              Name: {d.name} : Eierandel %: {d.ownershipPercentage} : Verdi:{" "}
              {d.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
