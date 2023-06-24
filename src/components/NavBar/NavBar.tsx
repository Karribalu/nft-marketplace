import { useEffect, useState } from "react";
import "./NavBar.css";

import { BrowserRouter, Route, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
export interface INavBarProps {}

export function NavBar(props: INavBarProps) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("0x");
  const [menuSelected, setMenuSelected] = useState(false);
  const location = useLocation();
  const handleMenu = () => {
    setMenuSelected(!menuSelected);
  };

  function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = signer.getAddress();
    setAccount(addr);
  }
  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (chainId !== "0x5") {
      alert("Please connect to Goerli Test Network");

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    if (window.ethereum && window.ethereum.request) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          setConnected(true);
          getAddress();
          window.location.replace(location.pathname);
        })
        .catch((err: any) => {
          alert(err.message);
        });
    }
  }
  useEffect(() => {
    if (window.ethereum == undefined) return;

    let val = window.ethereum.isConnected();
    if (val) {
      setConnected(true);
      getAddress();
    }

    window.ethereum.on("accountsChanged", function (accounts: any) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div>
      <div className="navbar">
        <div className="navbar_left">
          <Link to="/">
            <div className="navbar_left_item">NFT Marketplace</div>
          </Link>
        </div>

        <div className={menuSelected ? "navbar_right_active" : "navbar_right"}>
          {location.pathname === "/" ? (
            <Link to="/" className="navbar_right_item_active">
              Marketplace
            </Link>
          ) : (
            <Link to="/" className="navbar_right_item">
              Marketplace
            </Link>
          )}
          {location.pathname === "/listNFT" ? (
            <Link to="/listNFT" className="navbar_right_item_active">
              List My NFT
            </Link>
          ) : (
            <Link to="/listNFT" className="navbar_right_item">
              List My NFT
            </Link>
          )}

          {location.pathname === "/profile" ? (
            <Link to="/profile" className="navbar_right_item_active">
              Profile
            </Link>
          ) : (
            <Link to="/profile" className="navbar_right_item">
              Profile
            </Link>
          )}

          <button className="navbar_right_connect">
            {connected ? "Connected" : "Connect Wallet"}
          </button>
        </div>
        <div className="hamburger" onClick={handleMenu}>
          {!menuSelected ? (
            <GiHamburgerMenu style={{ fontSize: "40px", color: "white" }} />
          ) : (
            <AiOutlineClose style={{ fontSize: "40px", color: "white" }} />
          )}
        </div>
      </div>

      <div className="connected_wallet_text">
        <span>
          {account !== ""
            ? `Connected to ${account}`
            : "Not Connected, Please login to view NFTs"}{" "}
        </span>
      </div>
    </div>
  );
}
