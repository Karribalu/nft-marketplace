import * as React from "react";
import "./NavBar.css";
import fullLogo from "../../assets/full_logo.png";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useLocation } from "react-router";
export interface INavBarProps {}

export function NavBar(props: INavBarProps) {
  const [connected, setConnected] = React.useState(false);
  const [account, setAccount] = React.useState("0x12345654234565");
  const location = useLocation();
  return (
    <div>
      <div className="navbar">
        <div className="navbar_left">
          <Link to="/">
            <img src={fullLogo} width={100} height={25} alt="Logo" />
            <div className="navbar_left_item">NFT Marketplace</div>
          </Link>
        </div>

        <div className="navbar_right">
          {location.pathname === "/marketplace" ? (
            <Link to="/marketplace" className="navbar_right_item_active">
              Marketplace
            </Link>
          ) : (
            <Link to="/marketplace" className="navbar_right_item">
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
