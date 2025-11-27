require("dotenv/config");
const hre = require("hardhat");

const DEFAULT_SUPPLY = "1000000"; // 1M tokens

async function main() {
  const tokenName = process.env.TOKEN_NAME || "Monad Utility Token";
  const tokenSymbol = process.env.TOKEN_SYMBOL || "MONUT";
  const supplyInput = process.env.TOKEN_SUPPLY || DEFAULT_SUPPLY;
  const treasuryAddress = process.env.TREASURY_ADDRESS;

  if (Number.isNaN(Number(supplyInput))) {
    throw new Error("TOKEN_SUPPLY must be a number (units of whole tokens).");
  }

  const initialSupply = hre.ethers.parseUnits(supplyInput, 18);
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying MyToken with parameters:");
  console.log(`  Name:    ${tokenName}`);
  console.log(`  Symbol:  ${tokenSymbol}`);
  console.log(`  Supply:  ${supplyInput} tokens`);
  console.log(`  Deployer: ${deployer.address}`);

  const token = await hre.ethers.deployContract("MyToken", [
    tokenName,
    tokenSymbol,
    initialSupply,
  ]);

  await token.waitForDeployment();

  console.log(`MyToken deployed at ${token.target}`);

  if (treasuryAddress) {
    const transferTx = await token
      .connect(deployer)
      .transfer(treasuryAddress, initialSupply);
    await transferTx.wait();
    console.log(`Transferred full supply to treasury ${treasuryAddress}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
