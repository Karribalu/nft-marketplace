import { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { NFTTile } from "../NFTTile/NFTTile";
import nft1 from "../../assets/bored_ape.avif";
import nft2 from "../../assets/bored_ape_2.avif";
import nft3 from "../../assets/nft3.avif";
import "./Marketplace.css";
import marketplace from "../../Marketplace.json";
import axios from "axios";
export interface IMarketplaceProps {}

export function Marketplace(props: IMarketplaceProps) {
  const [data, setData] = useState([
    {
      price: 0,
      tokenId: 0,
      seller: "",
      owner: "",
      image: "",
      name: "",
      description: "",
    },
  ]);
  const [dataFetched, setDataFetched] = useState(false);
  const nfts = [
    {
      image: nft1,
      tokenId: "100",
      description: "lorem ipsum dolor sit amet",
    },
    {
      image: nft2,
      tokenId: "101",
      description: "lorem ipsum dolor sit amet",
    },
    {
      image: nft3,
      tokenId: "102",
      description: "lorem ipsum dolor sit amet",
    },
    {
      image: nft1,
      tokenId: "100",
      description: "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    },
    {
      image: nft2,
      tokenId: "101",
      description: "lorem ipsum dolor sit amet ",
    },
    {
      image: nft3,
      tokenId: "102",
      description: "lorem ipsum dolor sit amet",
    },
  ];
  const GetIpfsUrlFromPinata = (pinataUrl: any) => {
    var IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
  };
  async function getAllNFTs() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplace.address,
      marketplace.abi,
      signer
    );
    let transaction = await contract.getAllNFTs();
    const items = await Promise.all(
      transaction.map(async (i: any) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log(tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);

        let meta = await axios.get(tokenURI);
        const metaData = meta.data;
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: metaData.image,
          name: metaData.name,
          description: metaData.description,
        };
        return item;
      })
    );
    setData(items);
    setDataFetched(true);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div>
      <NavBar />

      <div className="marketplace">
        <h2 className="marketplace_title">Top NFTs</h2>
        <div className="tile_marketplace">
          {nfts.map((nft) => (
            <NFTTile
              image={nft.image}
              tokenId={nft.tokenId}
              description={nft.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
