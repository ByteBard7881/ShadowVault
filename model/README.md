# 🤖 AI Threat Detection Model - README

## 🎯 **What This Does**

**Logistic Regression model** that detects malicious network packets in **real-time** for the ShadowVault cybersecurity system.

### 📊 **Model Performance**
- ✅ **92.56% Accuracy** on test data
- 🔍 **Binary Classification** (Normal vs Malicious packets)
- ⚡ **Lightweight & Fast** - Perfect for real-time detection

---

## 🏗️ **Project Structure**

```
AI_Model/
├── main.ipynb                     # Training notebook
├── scaled_data.csv                # Preprocessed dataset
├── logreg_model.joblib            # Trained model (saved)
├── features.csv                   # Feature descriptions
└── README.md                      # This file
```

---

## 📦 **Dataset Information**

### **`scaled_data.csv`**
- **Preprocessed** network packet data
- **18 features** (normalized 0-1)
- **Binary labels**: 0 = Normal, 1 = Malicious
- **No missing values** - cleaned dataset

### **Key Features Used:**
1. **Flow Duration** ⏱️
2. **Total Forward/Backward Packets** 📦
3. **Packet Length Stats** (Max/Min/Std) 📏
4. **Inter-Arrival Time Stats** (Std/Max/Min) ⏰
5. **Flag Counts** (PSH, URG) 🚩

---

## 🔧 **Setup Instructions**

### **Step 1: Extract Data**
```bash
# Unzip the dataset files
unzip scaled_data.zip
unzip features.zip

# You should now have:
# - scaled_data.csv
# - features.csv
```

### **Step 2: Install Dependencies**
```python
pip install pandas numpy scikit-learn matplotlib seaborn joblib jupyter
```

### **Step 3: Run Training**
```python
# Open and run main.ipynb in Jupyter
jupyter notebook main.ipynb
```

---

## 🚀 **Quick Training Command**

```python
# From terminal (if you want to run as script):
python -c "
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load data
data = pd.read_csv('scaled_data.csv')
X = data.drop('Label', axis=1)
y = data['Label']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(f'Accuracy: {accuracy_score(y_test, y_pred):.2%}')

# Save model
joblib.dump(model, 'logreg_model.joblib')
print('✅ Model saved as logreg_model.joblib')
"
```

---

## 📈 **Model Results**

### **Confusion Matrix:**
```
[[TN  FP]
 [FN  TP]]
```

### **Where:**
- **TN** = Correctly identified Normal packets ✅
- **TP** = Correctly identified Malicious packets 🚨
- **FP** = False Alarm (Normal flagged as Malicious) ⚠️
- **FN** = Missed Threat (Malicious flagged as Normal) ❌

---

## 🔗 **Integration with ShadowVault**

### **How it works in the system:**
1. **📡 Live Packets** → WebSocket stream
2. **🤖 AI Model** → Real-time prediction
3. **🚨 Alert if** `prediction == 1`
4. **⛓️ Blockchain** → Store confirmed threats

### **Load Model in Backend:**
```python
import joblib

# Load trained model
model = joblib.load('logreg_model.joblib')

# Predict on new packet
prediction = model.predict([packet_features])
# Returns: 0 (Normal) or 1 (Malicious)
```

---

## ⚙️ **Model Details**

| Metric | Value |
|--------|-------|
| **Algorithm** | Logistic Regression |
| **Training Size** | 80% of dataset |
| **Testing Size** | 20% of dataset |
| **Random State** | 42 (reproducible) |
| **Max Iterations** | 1000 |
| **Accuracy** | **92.56%** |

---

## 🎮 **Test the Model**

```python
# Example prediction with sample data
sample_packet = [
    0.00000544,  # Flow Duration
    0.00002730,  # Tot Fwd Pkts
    0.00001370,  # Tot Bwd Pkts
    0.00886382,  # Fwd Pkt Len Max
    0.0,         # Fwd Pkt Len Min
    0.01506527,  # Fwd Pkt Len Std
    0.01362253,  # Bwd Pkt Len Max
    0.0,         # Bwd Pkt Len Min
    0.01261135,  # Bwd Pkt Len Std
    0.00000230,  # Fwd IAT Std
    0.00000414,  # Fwd IAT Max
    0.00000011,  # Fwd IAT Min
    0.00000360,  # Bwd IAT Std
    0.00000442,  # Bwd IAT Max
    0.00000003,  # Bwd IAT Min
    1.0,         # PSH Flag Cnt
    0.0          # URG Flag Cnt
]

prediction = model.predict([sample_packet])
print(f"🚨 Malicious!" if prediction[0] == 1 else "✅ Normal")
```

---

## 📁 **File Descriptions**

| File | Purpose |
|------|---------|
| **`main.ipynb`** | Complete training notebook |
| **`scaled_data.csv`** | Ready-to-use dataset |
| **`logreg_model.joblib`** | Pre-trained model |
| **`features.csv`** | Feature explanations |

---

## 🔄 **Retraining the Model**

To retrain with new data:
1. **Add new packets** to `scaled_data.csv`
2. **Run all cells** in `main.ipynb`
3. **New model** automatically saves
4. **Update backend** with new model file

---

## 🚨 **Important Notes**

✅ **Works with:** Same 18 features as training  
✅ **Input:** Normalized values (0-1)  
✅ **Output:** 0 (Safe) or 1 (Malicious)  
⚠️ **Keep scaled_data.csv secure** - contains attack patterns  
⚠️ **Regular updates** recommended for new threats  

---

## 🆘 **Troubleshooting**

| Issue | Solution |
|-------|----------|
| ❌ "File not found" | Extract both ZIP files |
| ❌ "Import errors" | Run `pip install -r requirements.txt` |
| ❌ "Low accuracy" | Check feature scaling (0-1 range) |
| ❌ "Model not loading" | Use `joblib.load('logreg_model.joblib')` |

---

## 🎉 **Ready to Detect Threats?**

```bash
# 1. Extract files
unzip scaled_data.zip features.zip

# 2. (Optional) Retrain
jupyter notebook main.ipynb

# 3. Integrate with backend
#    Copy logreg_model.joblib to your server
```