import { useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { NFTTile } from "../NFTTile/NFTTile";
import "./Profile.css";
export interface IProfileProps {}

export function Profile(props: IProfileProps) {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState("0x");
  const [totalValue, setTotalValue] = useState("0");
  const [totalNFT, setTotalNFT] = useState("0");
  const [dataFetch, setDataFetch] = useState(false);

  const fetchData = async () => {};
  if (!dataFetch) {
    fetchData();
  }

  return (
    <div>
      <NavBar />
      <div className="profile">
        <div className="profile_address">
          <div className="profile_address_title">Wallet Address</div>
          <div className="profile_address_value">{address}</div>
        </div>
        <div className="profile_nfts_total">
          <div>
            <div className="profile_nfts_total_title">Total Value</div>
            <div className="profile_nfts_total_value">{totalValue}</div>
          </div>
          <div>
            <div className="profile_nfts_total_title">Total NFTs</div>
            <div className="profile_nfts_total_value">{totalNFT}</div>
          </div>
        </div>
        <div className="profile_nfts">
          <div className="profile_nfts_title">Your NFTs</div>
          <div className="profile_nfts_list">
            {data.map((item: any, index) => {
              return (
                <NFTTile
                  image={item.image}
                  tokenId={item.tokenId}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="error_nft">
            {data.length === 0 ? "Oops, No NFTs found!" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
