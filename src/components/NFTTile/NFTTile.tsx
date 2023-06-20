import { useEffect } from "react";
import "./NFTTile.css";
import { Link } from "react-router-dom";
export interface INFTTileProps {
  image: string;
  tokenId: string;
  description: string;
}

export function NFTTile(props: INFTTileProps) {
  const { image, tokenId, description } = props;
  const pathName = {
    pathname: "/nftpage/" + tokenId,
  };
  return (
    // <div className="nft_tile">
    //   <img className= "img" height={400} width={400} src={image} alt="nft" />
    //   <div className="nft_tile_token_id">{tokenId}</div>
    //   <p className="nft_tile_description">{description}</p>
    // </div>

    <Link to={pathName}>
      <div className="tile">
        <div className="tile-content">
          <div
            className="tile-image"
            style={{ backgroundImage: `url(${image})` }}
          >
            {/* Image content goes here */}
          </div>
          <div className="tile-overlay">
            <h2 className="tile-heading">NFT#{tokenId}</h2>
            <p className="tile- description">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
