# 🔒 ShadowVault - AI-Powered Cyber Threat Defense on Blockchain

> **Fortifying Cybersecurity with AI Precision and Blockchain Integrity**

## 🎯 **Welcome to ShadowVault!**

Welcome to the future of cybersecurity! ShadowVault is a cutting-edge security platform that combines **Artificial Intelligence** with **Blockchain technology** to detect, alert, and permanently record malicious network activities in real-time.

### 🌟 **What Makes ShadowVault Special?**
- 🤖 **AI-Powered Detection**: Machine learning models identify threats instantly
- ⛓️ **Blockchain Integrity**: Immutable storage of security incidents
- 📡 **Real-Time Monitoring**: Live packet analysis and alerts
- 🔄 **Full-Stack Solution**: Complete from frontend to smart contracts

---

## 📁 **Repository Structure**

```
ShadowVault/
├── 📁 app/              # React Web Dashboard
├── 📁 hardhat/        # Ethereum Blockchain Integration
├── 📁 model/              # Machine Learning for Threat Detection
├── 📁 server/                # WebSocket Server & Cloud Client
└── 📄 README.md              # You are here!
```

---

## 🚀 **Quick Start Guide**

### **Option 1: 🏁 Complete System Setup**
Follow these steps to run the entire ShadowVault ecosystem:

```bash
# 1. Clone the repository
git clone https://github.com/ByteBard7881/ShadowVault.git
cd ShadowVault

# 2. Navigate to each folder and follow their READMEs:
cd app        # Install dependencies and start dashboard
cd hardhat  # Deploy blockchain contracts
cd model        # Train and prepare ML model
cd server          # Start the WebSocket server
```

### **Option 2: 🧪 Quick Demo Setup**
Just want to see it work? Start here:
```bash
# 1. Start with the frontend (requires MetaMask)
cd app
npm install
npm run dev

# 2. Open browser at http://localhost:3000
```

---

## 📋 **Component Details**

### **1. 🎨 Frontend Dashboard** (`/app/`)
**Interactive web interface for real-time monitoring**
- 📊 Live packet visualization
- 🚨 Threat alert system
- 🔗 MetaMask wallet integration
- 📜 Historical threat viewer

📖 *[Detailed Frontend Guide →](./app/README.md)*

### **2. ⛓️ Smart Contracts** (`/hardhat/`)
**Ethereum-based immutable threat storage**
- 🔐 Secure threat recording on blockchain
- 📝 Permanent audit trail
- 💰 Gas-optimized transactions
- 📡 Frontend integration via ethers.js

📖 *[Smart Contract Deployment Guide →](./hardhat/README.md)*

### **3. 🤖 AI Threat Detection** (`/model/`)
**Machine learning model for anomaly detection**
- 🧠 Logistic Regression classifier
- 🎯 92.56% detection accuracy
- ⚡ Real-time prediction
- 📊 Pre-trained model included

📖 *[AI Model Training Guide →](./model/README.md)*

### **4. 📡 Server & Cloud** (`/server/`)
**Real-time communication and mitigation**
- 🌐 WebSocket server for live data
- ☁️ Cloud mitigation client
- 🔄 Threat response coordination
- 📦 File transfer during mitigation

📖 *[Server Setup Guide →](./server/README.md)*

---

### **Data Flow:**
1. 📡 Server streams simulated packets
2. 🤖 AI model detects malicious activity
3. 🚨 Frontend shows alert to user
4. ✅ User confirms mitigation
5. ⛓️ Smart contract records on blockchain
6. 📜 Malicious packets stored permanently

---

## 🛠️ **Prerequisites**

### **Required Software:**
- 🟢 **Node.js** (v14+)
- 🦊 **MetaMask** browser extension
- 🐍 **Python 3.8+** (for AI/Server)
- 💻 **Git** (for cloning)

### **Accounts Needed:**
- 🌐 **Sepolia Testnet ETH** (free from faucet)
- 🔑 **Etherscan API Key** (optional, for verification)

---

## 🎮 **Demo Walkthrough**

### **Step-by-Step Experience:**
```bash
# 1. Start the backend
cd Server
python main.py        # Terminal 1
python client.py      # Terminal 2

# 2. Start the frontend
cd Frontend
npm start

# 3. Connect MetaMask (Sepolia network)
# 4. Navigate to /packet to see live data
# 5. Watch for alerts and confirm mitigation
# 6. Check /malicious for blockchain-stored threats
```

### **What You'll Experience:**
✅ Real-time packet simulation  
✅ AI threat detection popups  
✅ Blockchain transaction confirmations  
✅ Permanent threat storage  
✅ Cloud mitigation file transfers  

---

## 📊 **Performance Metrics**

| Component | Metric | Value |
|-----------|--------|-------|
| **AI Model** | Accuracy | 92.56% |
| **Blockchain** | Transaction Cost | ~150k gas |
| **Frontend** | Load Time | < 2s |
| **Server** | Response Time | < 100ms |

---

## 🔧 **Customization Options**

### **For Developers:**
```bash
# Use your own dataset
cp your_data.csv model/scaled_data.csv

# Deploy to different network
cd hardhat
# Edit hardhat.config.js

# Customize frontend styling
cd app/src/App.css
```

### **For Researchers:**
- 🧪 Experiment with different ML models
- 📈 Add new network features
- 🔍 Modify detection thresholds
- 📚 Extend blockchain data structure

---

## 🆘 **Troubleshooting**

### **Common Issues:**
```bash
# MetaMask not connecting?
- Check Sepolia network
- Get test ETH from faucet

# Server not starting?
- Check port 5000 availability
- Ensure Python dependencies installed

# Blockchain errors?
- Verify contract address in frontend
- Check wallet has enough ETH
```

📖 *See individual folder READMEs for specific troubleshooting*

---

## 🤝 **Contributing**

We welcome contributions! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. 💻 Make your changes
4. ✅ Test thoroughly
5. 🔀 Submit a pull request

### **Areas needing improvement:**
- 🔐 Enhanced security features
- 📱 Mobile-responsive design
- 🧠 Additional ML models
- 🌐 Multi-language support

---

## 📄 **License**

MIT License - See [LICENSE](LICENSE) for details.

### **Disclaimer:**
⚠️ **For educational/demo purposes only**  
⚠️ **Not for production security systems**  
⚠️ **Use at your own risk**

---

## 🙏 **Acknowledgments**

- **React & Web3.js** for frontend magic
- **Hardhat & ethers.js** for blockchain integration
- **Scikit-learn** for machine learning
- **Flask & WebSockets** for real-time communication

---

## 🎉 **Ready to Secure Your Network?**

```bash
# Start your cybersecurity journey:
git clone https://github.com/ByteBard7881/ShadowVault.git
cd ShadowVault

# Choose your starting point:
# - For UI: cd app
# - For AI: cd model
# - For Blockchain: cd hardhat
# - For Backend: cd server

# Happy coding! 🚀
```

## 📞 **Need Help?**

- 📖 Check individual folder READMEs
- 🐛 Open an issue for bugs
- 💡 Suggest features via issues
- ⭐ Star the repo if you like it!

---

**Welcome to the future of cybersecurity defense!** 🔒✨

*"Preventing threats today, securing tomorrow."*