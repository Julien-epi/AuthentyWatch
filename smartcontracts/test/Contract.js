const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CoupDePousse", function () {
  let Contract;
  let contract;
  let owner;
  let user;
  let association;
  const decimals = 8;

  const errors = {
    NOT_ADMIN: "Caller is not admin",
    OUT_OF_RANGE: "ID out of range",
  }

  before(async () => {
    [admin, user] = await ethers.getSigners();
    Contract = await ethers.getContractFactory("Authentywatch");
    contract = await Contract.connect(owner).deploy("Authentywatch", "ATW");
  });

  describe("initialization", function () {
    it("Should have the correct name and symbol", async function () {
      const name = await contract.name();
      const symbol = await contract.symbol();

      expect(name).to.equal("Authentywatch");
      expect(symbol).to.equal("ATW");
    });
  });

  describe("minting", function () {
    it("Should mint a token", async function () {
      await contract.connect(owner).mint(user.address, 1);
      const balance = await contract.balanceOf(user.address);

      expect(balance).to.equal(1);
    });

    it("Should mint multiple tokens", async function () {
      await contract.connect(owner).mint(user.address, 2);
      const balance = await contract.balanceOf(user.address);

      expect(balance).to.equal(3);
    });

    it("Should not mint a token if not admin", async function () {
      await expect(contract.connect(user).mint(user.address, 1)).to.be.revertedWith(errors.NOT_ADMIN);
    });
  });
});
