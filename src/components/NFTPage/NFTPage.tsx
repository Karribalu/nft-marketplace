import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import nft1 from "../../assets/bored_ape.avif";
import "./NFTPage.css";
export interface INFTPageProps {}

export function NFTPage(props: INFTPageProps) {
  const data = {
    name: "Monkey King",
    description: "lorem ipsum dolor sit amet",
    price: 10,
    owner: "0x29CB237080255459F72326FE7fa38127852CF702",
    seller: "0x1FeB0C2275968709671c6a4bd89FAfb60756823b",
    image: nft1,
  };
  return (
    <div>
      <NavBar />
      <div className="nft_page">
        <div className="nft_page_left">
          <img src={nft1} alt="nft" />
        </div>

        <div className="nft_page_right">
          <div className="nft_page_right_left_pane">
            <h3 className="nft_page_right_heading">Name:</h3>{" "}
            <span className="nft_page_right_info">{data.name}</span>
            <h3 className="nft_page_right_heading">Description:</h3>{" "}
            <span className="nft_page_right_info">{data.description}</span>
            <h3 className="nft_page_right_heading">Price:</h3>{" "}
            <span className="nft_page_right_info">{data.price} ETH</span>
            <h3 className="nft_page_right_heading">Owner:</h3>{" "}
            <span className="nft_page_right_info">{data.owner}</span>
            <h3 className="nft_page_right_heading">Seller:</h3>{" "}
            <span className="nft_page_right_info">{data.seller}</span>
          </div>
          <button className="nft_page_right_button">Buy this NFT</button>
        </div>
      </div>
    </div>
  );
}
