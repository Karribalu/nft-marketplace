import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import nft1 from "../../assets/bored_ape.avif";
import "./NFTPage.css";
export interface INFTPageProps {}

export function NFTPage(props: INFTPageProps) {
  const data = {
    name: "Monkey King",
    discription: "lorem ipsum dolor sit amet",
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
          <table className="nft_page_right_table">
            <tr>
              <td>Name:</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{data.discription}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{data.price}</td>
            </tr>
            <tr>
              <td>Owner:</td>
              <td>{data.owner}</td>
            </tr>
            <tr>
              <td>Seller:</td>
              <td>{data.seller}</td>
            </tr>
          </table>
          <button className="nft_page_right_button">Buy this NFT</button>
        </div>
      </div>
    </div>
  );
}
