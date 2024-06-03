const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

describe("Sample", function () {
  let contract;
  let deployer, owner;

  beforeEach(async function () {
    [deployer, owner, ...clients] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Sample");
    contract = await ContractFactory.connect(deployer).deploy();
  });

  describe('Deployment', () => {
    it('Should deploy successfully', async () => {
      expect(await contract.owner()).to.equal(deployer.address);
    });
  });
});
