# 🧠 Smart Contract - AlertPacketStorage

## 📦 **Solidity Contract for Threat Storage**

### 🎯 **Purpose**
Stores malicious network packet data **permanently** on the Ethereum blockchain.  
Every threat detected by the AI gets an **immutable record**.

---

## 📄 **Contract: `AlertPacketStorage.sol`**

### 🏗️ **Structure**
```solidity
// Key Data Structures
struct Packet {
    mapping(string => string) data;  // Key-value storage
    bool isAlert;                    // Alert flag
}

// Storage
mapping(uint256 => Packet) private packets;  // All packets
uint256[] private alertPacketIds;            // Alert IDs only
uint256 private nextId = 1;                  // Auto-increment ID
```

### ⚡ **Core Functions**

| Function | Purpose | Gas Cost |
|----------|---------|----------|
| **`storePacket()`** | Store new packet (malicious or normal) | Medium |
| **`getAlertPacket()`** | Retrieve specific alert packet | Free 📶 |
| **`getAllAlertPacketIds()`** | Get all alert packet IDs | Free 📶 |

---

## 🚀 **Deployment Script: `deploy.js`**

### 📋 **What It Does:**
1. **Compiles** the Solidity contract
2. **Deploys** to chosen network (Sepolia/Mainnet)
3. **Verifies** on Etherscan (auto)
4. **Outputs** contract address

### 🔧 **Prerequisites**
```bash
# Install dependencies
yarn add hardhat @nomicfoundation/hardhat-toolbox dotenv

# Create .env file
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "ETHERSCAN_API_KEY=your_etherscan_key_here" >> .env
```

---

## 🛠️ **Deployment Steps**

### 1️⃣ **Setup Environment**
```bash
# Install Hardhat & dependencies
yarn init -y
yarn add --dev hardhat
yarn hardhat init  # Choose "Create a JavaScript project"
```

### 2️⃣ **Configure Networks**
```javascript
// hardhat.config.js
module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

### 3️⃣ **Deploy to Sepolia**
```bash
# Run deployment
npx hardhat run scripts/deploy.js --network sepolia

# Expected Output:
[+] Smart contract successfully deployed at: 0x67E650C30402e4B94a0A7206422896D40b0916D7
[+] Contract successfully verified on Etherscan.
```

---

## 🔗 **Frontend Integration**

### **Update Your React App:**
```javascript
// In Packet.jsx and Malicious.jsx
const CONTRACT_ADDRESS = "0x67E650C30402e4B94a0A7206422896D40b0916D7";
const CONTRACT_ABI = abi.abi; // From contractJson/AlertPacketStorage.json
```

### **Get ABI After Deployment:**
```bash
# Copy ABI from artifacts
cp artifacts/contracts/Storage.sol/AlertPacketStorage.json ./src/contractJson/
```

---

## 📊 **Data Flow - From Detection to Blockchain**

```
🤖 AI Detection → 🚨 Frontend Alert → ✅ User Confirm → ⛓️ storePacket()
    ↓
📡 WebSocket "OK" → 🔗 Blockchain TX → ✅ TX Confirmed → 📁 Record Stored
    ↓
👀 View at /malicious ← 📜 getAlertPacket() ← 📋 getAllAlertPacketIds()
```

---

## 🎯 **Key Features**

| Feature | Benefit |
|---------|---------|
| **🔒 Immutable Storage** | Once stored, cannot be modified |
| **🚨 Alert-Only Tracking** | Separate storage for malicious packets |
| **📡 Gas Optimization** | Free read functions (`view`) |
| **🔍 Etherscan Verification** | Transparent, readable code |
| **🆔 Auto-Increment IDs** | No ID collisions |

---

## 💰 **Gas Estimates**

| Action | Estimated Gas |
|--------|---------------|
| **Store Malicious Packet** | ~150,000 - 250,000 gas |
| **Store Normal Packet** | ~100,000 - 200,000 gas |
| **Read Alert Packet** | FREE (view function) |
| **Get All IDs** | FREE (view function) |

*📌 Approximate costs on Sepolia testnet*

---

## 🚨 **Security Notes**

✅ **Checks:**
- Keys/values length match
- Alert flag validation
- Proper access control (currently public)

⚠️ **Consider for Production:**
- Add access control (only admin can store)
- Implement emergency pause
- Add event indexing for better filtering

---

## 🔄 **Testing Locally**

```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Run tests
npx hardhat test
```

---

## 📝 **Quick Commands Cheatsheet**

```bash
# 🛠️ Development
yarn hardhat compile      # Compile contracts
yarn hardhat test         # Run tests
yarn hardhat node         # Start local node

# 🚀 Deployment
yarn hardhat run scripts/deploy.js --network sepolia
yarn hardhat verify --network sepolia <contract_address>

# 📡 Frontend Integration
cp artifacts/contracts/Storage.sol/AlertPacketStorage.json ./src/contractJson/
```

---

## 🆘 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| ❌ "Invalid private key" | Check `.env` file format |
| ❌ "Insufficient funds" | Get Sepolia ETH from faucet |
| ❌ "Verification failed" | Wait 6 blocks then retry |
| ❌ "ABI not found" | Copy from `artifacts/` folder |

---

## 🎉 **Ready to Deploy?**

```bash
# 1. Configure .env
# 2. Fund your wallet with test ETH
# 3. Run:
yarn hardhat run scripts/deploy.js --network sepolia

# 4. Update frontend with new contract address
# 5. Start monitoring threats! 🚀
```