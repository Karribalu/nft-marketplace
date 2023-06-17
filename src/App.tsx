import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Marketplace } from "./components/Marketplace/Marketplace";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Marketplace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
