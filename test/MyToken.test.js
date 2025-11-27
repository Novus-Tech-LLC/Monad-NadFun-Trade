const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  async function deployTokenFixture() {
    const [owner, recipient, spender] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000000", 18);

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(
      "Monad Volume Token",
      "MONVOL",
      initialSupply
    );

    await token.waitForDeployment();

    return { token, owner, recipient, spender, initialSupply };
  }

  it("mints the full supply to the deployer", async function () {
    const { token, owner, initialSupply } = await deployTokenFixture();

    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("transfers tokens between wallets", async function () {
    const { token, owner, recipient } = await deployTokenFixture();
    const amount = ethers.parseUnits("2500", 18);

    await expect(token.transfer(recipient.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, recipient.address, amount);

    expect(await token.balanceOf(recipient.address)).to.equal(amount);
  });

  it("respects allowances via transferFrom", async function () {
    const { token, owner, recipient, spender } = await deployTokenFixture();
    const allowance = ethers.parseUnits("500", 18);

    await token.approve(spender.address, allowance);

    await expect(
      token.connect(spender).transferFrom(owner.address, recipient.address, allowance)
    )
      .to.emit(token, "Transfer")
      .withArgs(owner.address, recipient.address, allowance);

    expect(await token.allowance(owner.address, spender.address)).to.equal(0);
    expect(await token.balanceOf(recipient.address)).to.equal(allowance);
  });
});

