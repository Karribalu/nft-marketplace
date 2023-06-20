import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Marketplace } from "./components/Marketplace/Marketplace";
import { NFTPage } from "./components/NFTPage/NFTPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/" element={<NFTPage />} />
        <Route path="/nftpage/:tokenId" element={<NFTPage />} />
      </Routes>
    </div>
  );
}

export default App;
