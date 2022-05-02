import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import AddNewAsset from "./components/AddNewAsset";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CreatePortfolio from "./components/CreatePortfolio";

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignIn />
                  <Dashboard />
                  <CreatePortfolio/>
                </>
              }
            />
            <Route path="/add" element={<AddNewAsset />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
