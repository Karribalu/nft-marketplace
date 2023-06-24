require("dotenv").config();

module.exports = {
  env: {
    GOERLI_URL: process.env.GOERLI_URL,
    GOERLI_KEY: process.env.GOERLI_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};
