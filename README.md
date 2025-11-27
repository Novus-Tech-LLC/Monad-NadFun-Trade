# 💹 Monad Chain Trading Bot (Volume + Bundler)
**Professional Sniper, Bundler & Volume Automation for Monad-based DEXs**

A high-performance trading bot infrastructure built for the **Monad blockchain**, offering automated token deployment, liquidity pool creation, and advanced trading strategies such as sniping, bundling, and volume generation.

---

## 🧠 Overview
The **Monad Chain Trading Bot** automates token operations and trading activities on **Uniswap V3-style DEXs operating on Monad**.  
It covers everything from deploying tokens to adding liquidity, simulating volume, and executing atomic bundled transactions.

---

## 🚀 How It Works

### **Sniper Bot**
1. Load target token  
2. Fetch swap quote  
3. Apply slippage  
4. Buy immediately using configured wallet  
5. Emit tx hash, save logs, and optionally notify via Telegram  

### **Copy-Trader**
- Monitors mempool  
- Filters leader wallets  
- Detects swaps  
- Mirrors trades with your configurable position size  

### **Bundler**
- Reads custom sequence files  
- Executes swaps/liquidity events atomically  
- Fully configurable slippage, routes, per-step logic  

### **Volume Bot**
- Loops continuously  
- Generates buy & sell pressure  
- Randomized timing and amounts  
- Good for testing liquidity behavior  

---

## ✨ Key Features

- 🚀 **Token Deployment** (ERC20 / custom supply / metadata)  
- 💧 **Liquidity Management** using Uniswap-V3-compatible DEXs  
- 🔗 **Atomic Bundling** using private relays or bundler APIs  
- ⚡ **Sniper, Volume, and Bundler Strategies**  
- 🧪 **Mainnet Fork Testing** (Monad testnet support)  
- 🔐 **OpenZeppelin-secured contracts**  
- 🪙 **Multi-Wallet Orchestration** for parallel trades  

---

## 🏗️ Architecture

| Component | Description |
|----------|-------------|
| Smart Contracts | ERC20 + liquidity helpers |
| Bundler | Relay provider for MEV-safe atomic calls |
| DEX Layer | Uniswap V3 SDK adapter for Monad DEXs |
| Dev Environment | Hardhat compilation, testing, forking |

---

## 🧰 Technology Stack

| Component | Technology |
|-----------|------------|
| Smart Contracts | Solidity ^0.8.9 |
| Framework | Hardhat |
| Testing | Hardhat Toolbox |
| DEX Integration | Uniswap V3 SDK |
| Security | OpenZeppelin |
| RPC Provider | Monad RPC (QuickNode / DRPC / custom) |
| MEV Protection | Bundler / private relays |

---

## ⚙️ Core Modules

- **Wallet Factory** — HD wallets generated automatically  
- **Native MON Distributor** — Fund multiple bots at once  
- **Token Deployer** — Deploy ERC20 instantly  
- **LP Creator** — Create pools + add liquidity  
- **Auto-Buyer** — Parallel BUY execution from multiple wallets  
- **Balance Monitor** — Tracks MON & token balances  
- **JSON Exporter** — Saves wallets & TX details  

---

# 🛠️ Prerequisites

- Node.js **18.x** or **20.x** (Hardhat 2.x does not support Node 24 yet)
- npm 9+
- At least one RPC endpoint (BSC, Monad testnet, or a local Anvil/Hardhat node)

---

# 🚦 Quick Start

1. Copy the example environment file and update it with your keys:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile and test:
   ```bash
   npm run build
   npm test
   ```

---

# 🧪 Testing & Local Node

- `npm test` — Executes the mocha/Chai suite inside Hardhat.
- `npm run node` — Boots a local JSON-RPC node on chain-id 31337.
- Fork support is opt-in: set `ENABLE_FORK=true` (and a valid `BSC_RPC_URL`) to mirror live BSC state. Optionally pin `FORK_BLOCK=44716540` for deterministic snapshots.

---

# 🚀 Deployment Scripts

| Command | Description |
|---------|-------------|
| `npm run deploy:local` | Deploys to the in-memory Hardhat network |
| `npm run deploy:bsc` | Requires `BSC_RPC_URL` + `PRIVATE_KEY` |
| `npm run deploy:monad` | Requires `MONAD_RPC_URL` + `PRIVATE_KEY` |

Script knobs (consumed in `scripts/deploy.js`):

- `TOKEN_NAME`, `TOKEN_SYMBOL`, `TOKEN_SUPPLY`
- `TREASURY_ADDRESS` (optional recipient after deploy)
- `PRIVATE_KEY` (only for public networks)

---

# 🧬 Recommended Workflow

1. **Develop & unit test** ERC20 logic locally (`npm test`).
2. **Enable forking** when you need real liquidity data (Uniswap/volume sims).
3. **Deploy** with `npm run deploy:<network>`.
4. **Extend scripts** under `scripts/` for snipers, bundlers, and volume loops while reusing the same config surface.

---


# 👨‍💻 Author
### 📞 Telegram: [Novus Tech](https://t.me/novustch)   
https://t.me/novustch

