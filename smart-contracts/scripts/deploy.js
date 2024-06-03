const fs = require("fs");
const { ethers, artifacts } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const provider = ethers.provider;

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  // Get the ContractFactory
  const Sample = await ethers.getContractFactory("Sample");

  // Deploy contract
  const sample = await Sample.deploy();
  const sampleAddress = sample.target
  console.log("Tara contract deployed to:", sampleAddress);

  // Save copies of the contract's ABI and address to the frontend directory
  saveFrontendFiles(sample, "Sample");
}

function saveFrontendFiles(contract, name) {
  //saving files to the frontend folder inside of src
  const contractsDir = __dirname + "/../../frontend/src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    `${contractsDir}/${name}-address.json`,
    JSON.stringify({ address: contract.target }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    `${contractsDir}/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
