import axios from "axios";
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const FormData = require("form-data");
export const uploadJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      };
    })
    .catch(function (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        pinataUrl: "",
      };
    });
};

export const uploadFileToIPFS = async (file: any) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  let data = new FormData();
  data.append("file", file);
  console.log("file");
  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  console.log(secret, key);
  data.append("pinataMetadata", metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);

  const response = axios
    .post(url, data, {
      maxBodyLength: 10000, //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
        Authorization: process.env.REACT_APP_PINATA_JWT,
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
        message: "",
      };
    })
    .catch(function (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        pinataUrl: "",
      };
    });

  return response;
};
