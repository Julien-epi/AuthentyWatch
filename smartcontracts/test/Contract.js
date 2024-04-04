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
  let admin1;
  let admin2;
  let admin3;
  let admin4;
  let user;

  const errors = {
    NOT_ADMIN: "Caller is not admin",
    OUT_OF_RANGE: "ID out of range",
    CANT_DELETE_ADMIN: "Cannot remove the last admin",
    ALREADY_SIGNED: "Already signed"
  }

  before(async () => {
    [admin, admin1, admin2, admin3, admin4, user] = await ethers.getSigners();
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

    it("Should add multiple admins", async function () {
      await contract.connect(admin).addAdmin(admin1.address);
      await contract.connect(admin).addAdmin(admin2.address);
      await contract.connect(admin).addAdmin(admin3.address);
      await contract.connect(admin).addAdmin(admin4.address);
      const admins = await contract.getAdmins();
      expect(admins.length).to.equal(5);
    });

    it("Should not get the admins if not admin", async function () {
      await expect(contract.connect(user).getAdmins()).to.be.revertedWith(errors.NOT_ADMIN);
    });

  });

  describe("mint", function () {
    it("Should mint a token", async function () {
      await contract.connect(admin).mint("ipfs://fileHash");
      const balance = await contract.balanceOf(await contract.getAddress());
      expect(balance).to.equal(0);
    });

    it("Should get the mint state", async function () {
      const tx = await contract.getTxState(0);
      expect(tx[0]).to.equal(0);
      expect(tx[1]).to.equal("ipfs://fileHash");
      expect(tx[2].length).to.equal(1);
    });

    it("Should not get the mint state if not admin", async function () {
      await expect(contract.connect(user).getTxState(0)).to.be.revertedWith(errors.NOT_ADMIN);
    });

    it("Should not validate the mint token if out of range", async function () {
      await expect(contract.getTxState(4)).to.be.revertedWithoutReason();
    });

    it("Should not validate the mint token with the same caller", async function () {
      await expect(contract.connect(admin).mint("")).to.be.revertedWith(errors.ALREADY_SIGNED);
    });


    it("Should validate the mint token", async function () {
      await contract.connect(admin1).mint("");
      await contract.connect(admin2).mint("");
      const balance = await contract.balanceOf(await contract.getAddress());

      expect(balance).to.equal(1);
    });

    it("Should not mint a token if not admin", async function () {
      await expect(contract.connect(user).mint("")).to.be.revertedWith(errors.NOT_ADMIN);
    });
  });

  describe("getting tokens URIs", function () {
    it("Should get a token URI", async function () {
      const uri = await contract.tokenURI(1);

      expect(uri).to.equal("ipfs://fileHash");
    });

    it("Should not get a token URI if out of range", async function () {
      await expect(contract.tokenURI(2)).to.be.revertedWith(errors.OUT_OF_RANGE);
    });

    it("Should get all token URIs", async function () {
      await contract.connect(admin).mint("");
      await contract.connect(admin1).mint("");
      await contract.connect(admin2).mint("");
      const uris = await contract.getTokens(1, 2);

      expect(uris).to.have.lengthOf(2);
    });

    it("Should not get all token URIs if out of range", async function () {
      await expect(contract.getTokens(2, 3)).to.be.revertedWith(errors.OUT_OF_RANGE);
    });
  });

  describe("update", function () {
    it("Should update a token", async function () {
      await contract.connect(admin).updateURI("ipfs://newHash", 2);
      const uri = await contract.tokenURI(2);
      expect(uri).to.equal("");
    });

    it("Should get the update state", async function () {
      const tx = await contract.getTxState(2);
      expect(tx[0]).to.equal(2);
      expect(tx[1]).to.equal("ipfs://newHash");
      expect(tx[2].length).to.equal(1);
    });

    it("Should not validate the update token with the same caller", async function () {
      await expect(contract.connect(admin).updateURI("", 0)).to.be.revertedWith(errors.ALREADY_SIGNED);
    });

    it("Should validate the update token", async function () {
      await contract.connect(admin1).updateURI("", 0);
      await contract.connect(admin2).updateURI("", 0);
      const uri = await contract.tokenURI(2);

      expect(uri).to.equal("ipfs://newHash");
    });
  });

  describe("burn", function () {
    it("Should burn a token", async function () {
      await contract.connect(admin).burn(2);
      const balance = await contract.balanceOf(await contract.getAddress());
      expect(balance).to.equal(2);
    });

    it("Should get the burn state", async function () {
      const tx = await contract.getTxState(1);
      expect(tx[0]).to.equal(2);
      expect(tx[1]).to.equal("");
      expect(tx[2].length).to.equal(1);
    });

    it("Should not validate the burn token with the same caller", async function () {
      await expect(contract.connect(admin).burn(0)).to.be.revertedWith(errors.ALREADY_SIGNED);
    });

    it("Should validate the burn token", async function () {
      await contract.connect(admin1).burn(0);
      await contract.connect(admin2).burn(0);
      const balance = await contract.balanceOf(await contract.getAddress());

      expect(balance).to.equal(1);
    });
  });

});
