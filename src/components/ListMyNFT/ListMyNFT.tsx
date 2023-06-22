import { useState } from "react";
import "./ListMyNFT.css";
import { NavBar } from "../NavBar/NavBar";
export interface IListMyNFTProps {}

export function ListMyNFT(props: IListMyNFTProps) {
  const [formData, updateFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const disableButton = () => {
    const listNftBtn =
      document.querySelectorAll<HTMLButtonElement>(".nft_list_btn");
    listNftBtn[0].disabled = true;
    listNftBtn[0].style.backgroundColor = "grey";
    listNftBtn[0].style.cursor = "not-allowed";
    listNftBtn[0].style.opacity = "0.5";
  };
  const listNft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { name, description, price } = formData;
    if (name === "" || description === "" || price === "") {
      setMessage("Please fill all the fields");
      disableButton();
      return;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="list_nft">
        <form className="list_nft_form">
          <h3>Upload your NFT to the Marketplace</h3>
          <div className="list_nft_form_div">
            <span className="span">NFT Name</span>
            <input
              className="nft_name_text"
              type="text"
              name="nft_name"
              placeholder="BALA#1432"
            />
          </div>
          <div className="list_nft_form_div">
            <span className="span">NFT Description</span>
            <textarea
              className="nft_description_textarea"
              cols={40}
              rows={5}
              id="description"
              placeholder="Bala best Collection"
            />
          </div>
          <div className="list_nft_form_div">
            <span className="span">Price (in ETH)</span>
            <input
              className="nft_price_input"
              type="number"
              id="nft_price"
              placeholder="Min 0.01 ETH"
            />
          </div>
          <div className="list_nft_form_div">
            <span className="span">Upload Image(&lt;500 KB)</span>
            <input type={"file"} className="nft_form_chose" name="nft_image" />
          </div>

          <span className="error">{message}</span>
          <button className="nft_list_btn" onClick={(e) => listNft(e)}>
            List NFT
          </button>
        </form>
      </div>
    </div>
  );
}
