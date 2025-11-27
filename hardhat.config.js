require("dotenv/config");
require("@nomicfoundation/hardhat-toolbox");

const DEFAULT_BSC_RPC =
  "https://small-thrilling-county.bsc.quiknode.pro/5309cc3b81880102c3951f4132560fa48f13a448/";
const BSC_RPC_URL = process.env.BSC_RPC_URL || DEFAULT_BSC_RPC;
const MONAD_RPC_URL = process.env.MONAD_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const FORK_BLOCK = process.env.FORK_BLOCK
  ? Number(process.env.FORK_BLOCK)
  : undefined;
const ENABLE_FORK = process.env.ENABLE_FORK === "true";

const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : undefined;

const hardhatNetwork = {
  chainId: 31337,
};

if (ENABLE_FORK && BSC_RPC_URL) {
  hardhatNetwork.forking = {
    url: BSC_RPC_URL,
  };

  if (!Number.isNaN(FORK_BLOCK) && FORK_BLOCK) {
    hardhatNetwork.forking.blockNumber = FORK_BLOCK;
  }
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: hardhatNetwork,
    ...(BSC_RPC_URL && {
      bsc: {
        url: BSC_RPC_URL,
        chainId: 56,
        accounts,
      },
    }),
    ...(MONAD_RPC_URL && {
      monadTestnet: {
        url: MONAD_RPC_URL,
        chainId: Number(process.env.MONAD_CHAIN_ID || 20143),
        accounts,
      },
    }),
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY || "",
  },
};
