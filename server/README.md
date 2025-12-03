# 🌐 ShadowVault AI Server - README

## 🎯 **What This Does**

**Real-time AI threat detection server** that:
1. 📡 **Streams simulated network packets** to frontend
2. 🤖 **Uses ML model** to detect malicious packets
3. 🚨 **Alerts users** via WebSocket
4. ☁️ **Mitigates threats** by sending data to cloud
5. ⛓️ **Triggers blockchain storage** on user confirmation

---

## 🏗️ **Project Structure**

```
server/
├── main.py                    # Main Flask/WebSocket server
├── client.py                  # Cloud mitigation client
├── model.joblib               # Trained AI model
├── features.zip               # Compressed dataset
├── DATA/                      # Example data for mitigation
│   └── ...                   # Files to send during mitigation
└── README.md                  # This file
```

---

## ⚙️ **Setup Instructions**

### **Step 1: Extract Dataset**
```bash
# Unzip the features file
unzip features.zip

# You should now have:
# - features.csv
```

### **Step 2: Install Dependencies**
```bash
pip install flask flask-sock websockets rich pandas joblib
```

### **Step 3: Get AI Model**
Ensure you have `model.joblib` in the server directory.  
*(This should be the trained model from the AI training step)*

### **Step 4: Run Both Services**

#### **📡 Terminal 1 - Start the Server**
```bash
python main.py
```

#### **☁️ Terminal 2 - Start Cloud Client**
```bash
python client.py
```

---

## 🔌 **Connection Flow**

```
1. 🤖 AI Server starts (port 5000)
2. ☁️ Cloud Client connects → "INIT|CLOUD"
3. 🌐 Web Frontend connects → "INIT|WEB"
4. ✅ Both connected → Start packet simulation
```

---

## 📡 **Server Workflow (main.py)**

### **1. Initialization**
```python
# Loads:
# - AI model (model.joblib)
# - Packet dataset (features.csv)
# - Sets up WebSocket routes
```

### **2. Packet Simulation**
```python
# For each packet in dataset:
# 1. 🤖 AI predicts: Malicious? (1) or Normal? (0)
# 2. 📨 Send to frontend:
#    - Normal: Send packet data
#    - Malicious: Send "ALERT" + packet data
```

### **3. Alert Handling**
```python
if user_clicks("Mitigate?"):
    # 1. ⏸️ Wait for "ENTER" key
    # 2. 📦 Zip DATA/ folder
    # 3. 📤 Send to Cloud Client
    # 4. ⛓️ Trigger blockchain storage
    # 5. ✅ Continue simulation
else:
    # ❌ Skip mitigation
```

---

## ☁️ **Cloud Client (client.py)**

### **Purpose:**
- 🔄 Listens for `"MITIGATE:"` commands
- 💾 Receives and saves zipped files
- 📁 Stores in `MITIGATION/` folder

### **File Reception:**
```python
# When server sends "MITIGATE:DATA.zip":
# 1. Create "uploaded_DATA.zip"
# 2. Receive chunks via WebSocket
# 3. Save when "EOF" received
# 4. Print "[+] Mitigation Successful"
```

---

## 🌐 **WebSocket Message Format**

| From | To | Message | Purpose |
|------|----|---------|---------|
| Web | Server | `"INIT\|WEB"` | Frontend connects |
| Cloud | Server | `"INIT\|CLOUD"` | Cloud connects |
| Server | Web | `{packet_data}` | Normal packet |
| Server | Web | `"ALERT{packet_data}"` | Malicious alert |
| Web | Server | `"yes"` / `"no"` | User decision |
| Server | Cloud | `"MITIGATE:DATA.zip"` | Start file transfer |
| Server | Cloud | `[binary chunks]` | File data |
| Server | Cloud | `"EOF"` | End of file |

---

## 🚀 **Quick Start Commands**

```bash
# Setup
unzip features.zip

# Run in two separate terminals:

# Terminal 1 - Server
python main.py

# Terminal 2 - Cloud Client
python client.py

# Terminal 3 - (Optional) Frontend
# npm start  # From frontend directory
```

---

## 📊 **Dataset Details**

### **`features.csv`**
- **18 network packet features**
- **Normalized values** (0-1)
- **Mixed** normal and malicious packets
- **Simulates** real network traffic

### **Sample Features:**
- `Flow Duration`
- `Tot Fwd/Bwd Pkts`
- `Packet Length Stats`
- `Inter-Arrival Times`
- `Flag Counts`

---

## ⚠️ **Important Notes**

### **IP Configuration:**
```python
# Change in main.py if needed:
host="10.181.171.195"  # Your server IP
port=5000
```

### **Prerequisites:**
✅ `features.csv` extracted  
✅ `model.joblib` exists  
✅ Port 5000 available  
✅ Both services running  

### **Order Matters:**
1. 🏁 Start server first
2. ☁️ Then start cloud client
3. 🌐 Then connect frontend

---

## 🔧 **Customization**

### **Change Dataset:**
```python
# Replace features.csv with your own
# Ensure same 18 features format
```

### **Adjust Simulation Speed:**
```python
# In packet_capture() method:
time.sleep(1)  # Change delay between packets
```

### **Modify Mitigation Data:**
```python
# Put files in DATA/ folder
# They'll be zipped and sent on mitigation
```

---

## 🐛 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| ❌ "features.csv not found" | Run `unzip features.zip` |
| ❌ "Address already in use" | Change port or kill process |
| ❌ "Model prediction error" | Check model.joblib exists |
| ❌ "Cloud not connected" | Start client.py first |
| ❌ "WebSocket timeout" | Check firewall/network |

---

## 📈 **Monitoring Output**

### **Server (main.py)**
```
Client connected
{'CLOUD': <WebSocket>, 'WEB': <WebSocket>}
📦 Sending packet...
🚨 ALERT! Sending to user...
⏳ Waiting for user decision...
📤 Mitigating threat...
✅ File DATA.zip uploaded
```

### **Cloud Client (client.py)**
```
📡 Connected to server...
📥 Receiving: uploaded_DATA.zip...
✅ Mitigation Successful
```

---

## 🎮 **Demo Mode**

### **Simulate Without Frontend:**
```python
# Temporarily modify main.py:
# Comment out the "ENTER" input line:
# input(f"ENTER FOR MITIGATION...")  # ← Comment this
print(f"[DEMO] Simulating mitigation...")
```

---

## 🔒 **Security Notes**

⚠️ **For demo only** - uses simulated data  
⚠️ **Change IPs** for production use  
⚠️ **Add authentication** for real deployment  
⚠️ **Encrypt** mitigation file transfers  

---

## 🎉 **Ready to Run?**

```bash
# 1. Extract dataset
unzip features.zip

# 2. Install packages
pip install flask flask-sock websockets rich pandas joblib

# 3. Ensure model.joblib is present
ls model.joblib

# 4. Start services in order
python main.py          # Terminal 1
python client.py        # Terminal 2

# 5. Connect frontend at:
# ws://10.181.171.195:5000/
```