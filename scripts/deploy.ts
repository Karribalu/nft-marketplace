import { ethers } from "hardhat";
import hre from "hardhat";
const fs = require("fs");
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const market = await ethers.deployContract("NFTMarketplace");
  await market.waitForDeployment();
  console.log("Market address:", await market.address);

  console.log("Saving artifacts...");

  const data = {
    address: await market.address,
    abi: market.interface as any,
  };
  fs.writeFileSync("./src/Marketplace.json", JSON.stringify(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
