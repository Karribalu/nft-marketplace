import * as React from "react";
import "./NavBar.css";
import fullLogo from "../../assets/full_logo.png";
import { BrowserRouter, Route, Link } from "react-router-dom";
export interface INavBarProps {}

export function NavBar(props: INavBarProps) {
  const [connected, setConnected] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="navbar">
        <div className="navbar_left">
          <Link to="/">
            <img src={fullLogo} width={100} height={30} alt="Logo" />
            <div className="navbar_left_item">NFT Marketplace</div>
          </Link>
        </div>

        <div className="navbar_right">
          <div className="navbar_right_item">
            <Link to="/marketplace">Marketplace</Link>
          </div>
          <div className="navbar_right_item">
            <Link to="/listNFT">List My NFT</Link>
          </div>
          <div className="navbar_right_item">
            <Link to="/myNFT">My NFT</Link>
          </div>
          {!connected && (
            <button className="navbar_right_connect">Connect Wallet</button>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}
