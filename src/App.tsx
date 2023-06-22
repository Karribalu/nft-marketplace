import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Marketplace } from "./components/Marketplace/Marketplace";
import { NFTPage } from "./components/NFTPage/NFTPage";
import { ListMyNFT } from "./components/ListMyNFT/ListMyNFT";
import { Profile } from "./components/Profile/Profile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/nftpage/:tokenId" element={<NFTPage />} />
        <Route path="/listNFT" element={<ListMyNFT />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
