import * as React from "react";
import "./NavBar.css";

import { BrowserRouter, Route, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
export interface INavBarProps {}

export function NavBar(props: INavBarProps) {
  const [connected, setConnected] = React.useState(false);
  const [account, setAccount] = React.useState("0x12345654234565");
  const [menuSelected, setMenuSelected] = React.useState(false);
  const location = useLocation();
  const handleMenu = () => {
    setMenuSelected(!menuSelected);
  };
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

          {location.pathname === "/myNFT" ? (
            <Link to="/myNFT" className="navbar_right_item_active">
              My NFT
            </Link>
          ) : (
            <Link to="/myNFT" className="navbar_right_item">
              My NFT
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
