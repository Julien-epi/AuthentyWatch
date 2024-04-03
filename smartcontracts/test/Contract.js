const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Authentywatch", function () {
  let Contract;
  let contract;
  let admin;
  let user;

  const errors = {
    NOT_ADMIN: "Caller is not admin",
    OUT_OF_RANGE: "ID out of range",
    CANT_DELETE_ADMIN: "Cannot remove the last admin",
  }

  before(async () => {
    [admin, user] = await ethers.getSigners();
    Contract = await ethers.getContractFactory("Authentywatch");
    contract = await Contract.connect(admin).deploy("Authentywatch", "ATW");
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
      await contract.connect(admin).mint(user.address, "");
      const balance = await contract.balanceOf(user.address);

      expect(balance).to.equal(1);
    });

    it("Should not mint a token if not admin", async function () {
      await expect(contract.connect(user).mint(user.address, "")).to.be.revertedWith(errors.NOT_ADMIN);
    });
  });

  describe("Managing admins", function () {
    it("Should not add an admin if not admin", async function () {
      await expect(contract.connect(user).addAdmin(user.address)).to.be.revertedWith(errors.NOT_ADMIN);
    });

    it("Should add an admin", async function () {
      await contract.connect(admin).addAdmin(user.address);
      const isAdmin = await contract.isAdmin(user.address);

      expect(isAdmin).to.be.true;
    });

    it("Should remove an admin", async function () {
      await contract.connect(admin).removeAdmin(user.address);
      const isAdmin = await contract.isAdmin(user.address);

      expect(isAdmin).to.be.false;
    });

    it("Should not remove an admin if not admin", async function () {
      await expect(contract.connect(user).removeAdmin(user.address)).to.be.revertedWith(errors.NOT_ADMIN);
    });

    it("Should not remove the last admin", async function () {
      await expect(contract.connect(admin).removeAdmin(admin.address)).to.be.revertedWith(errors.CANT_DELETE_ADMIN);
    });

    it("Should add second time an admin", async function () {
      await contract.connect(admin).addAdmin(user.address);
      const isAdmin = await contract.isAdmin(user.address);

      expect(isAdmin).to.be.true;
    });

  });

  describe("getting tokens URIs", function () {
    it("Should get a token URI", async function () {
      const uri = await contract.tokenURI(1);

      expect(uri).to.equal("");
    });

    it("Should not get a token URI if out of range", async function () {
      await expect(contract.tokenURI(2)).to.be.revertedWith(errors.OUT_OF_RANGE);
    });

    it("Should get all token URIs", async function () {
      await contract.connect(admin).mint(user.address, "");
      const uris = await contract.getTokens(1, 2);

      expect(uris).to.have.lengthOf(2);
    });

    it("Should not get all token URIs if out of range", async function () {
      await expect(contract.getTokens(2, 3)).to.be.revertedWith(errors.OUT_OF_RANGE);
    });
  });
});
