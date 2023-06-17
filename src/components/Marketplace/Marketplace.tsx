import { useEffect } from "react";
import { NavBar } from "../NavBar/NavBar";
import { NFTTile } from "../NFTTile/NFTTile";
import nft1 from "../../assets/bored_ape.avif";
import nft2 from "../../assets/bored_ape_2.avif";
import nft3 from "../../assets/nft3.avif";
import "./Marketplace.css";
export interface IMarketplaceProps {}

export function Marketplace(props: IMarketplaceProps) {
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
