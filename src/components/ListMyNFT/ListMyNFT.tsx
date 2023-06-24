import { useState } from "react";
import "./ListMyNFT.css";
import { NavBar } from "../NavBar/NavBar";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../pinata";
import Marketplace from "../../Marketplace.json";
export interface IListMyNFTProps {}

export function ListMyNFT(props: IListMyNFTProps) {
  const [formData, updateFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const ethers = require("ethers");
  const [message, setMessage] = useState("");
  const [fileURL, setFileURL] = useState(null);
  const disableButton = () => {
    const listNftBtn =
      document.querySelectorAll<HTMLButtonElement>(".nft_list_btn");
    listNftBtn[0].disabled = true;
    listNftBtn[0].style.backgroundColor = "grey";
    listNftBtn[0].style.cursor = "not-allowed";
    listNftBtn[0].style.opacity = "0.5";
  };
  const listNft = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { name, description, price } = formData;
    if (name === "" || description === "" || price === "") {
      setMessage("Please fill all the fields");
      disableButton();
      return;
    }
    try {
      const metadataURI = await uploadMetadataToIPFS();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setMessage("Please wait while we list your NFT");

      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      var nftPrice = ethers.utils.parseUnits(formData, "ether");
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();

      const transaction = await contract.createToken(metadataURI, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert("NFT listed successfully!");
      setMessage("");
      updateFormData({ name: "", description: "", price: "" });
      window.location.replace("/");
    } catch (error) {
      console.log("error during listing NFT", error);
    }
  };
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    try {
      const response = await uploadFileToIPFS(file);
      console.log(response);
      if (response.success) {
        setFileURL(response.pinataUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadMetadataToIPFS = async () => {
    const metadata = {
      name: formData.name,
      description: formData.description,
      image: fileURL,
      price: formData.price,
    };
    try {
      const response = await uploadJSONToIPFS(metadata);
      console.log(response);
      if (response.success) {
        console.log("pinata url is ", response.pinataUrl);
        return response.pinataUrl;
      }
    } catch (error) {
      console.log(error);
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
            <input
              type={"file"}
              className="nft_form_chose"
              name="nft_image"
              onChange={(e) => onChangeFile(e)}
            />
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
