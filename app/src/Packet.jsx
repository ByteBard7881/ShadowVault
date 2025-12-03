import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";
import Navbar from "./Navbar";
import { ethers } from "ethers";
import abi from "./contractJson/AlertPacketStorage.json";

const CONTRACT_ADDRESS = "0x67E650C30402e4B94a0A7206422896D40b0916D7";
const CONTRACT_ABI = abi.abi;
const UID = "WEB";
const MAX_PACKETS = 10;

const hardcodedData = {
  "Flow Duration": 0.000005441666394583348,
  "Tot Fwd Pkts": 0.000027302760309067245,
  "Tot Bwd Pkts": 0.000013702290337829969,
  "Fwd Pkt Len Max": 0.0088638195004029,
  "Fwd Pkt Len Min": 0,
  "Fwd Pkt Len Std": 0.0150652654538848,
  "Bwd Pkt Len Max": 0.0136225266362252,
  "Bwd Pkt Len Min": 0,
  "Bwd Pkt Len Std": 0.0126113459323845,
  "Fwd IAT Std": 0.0000022969081420785954,
  "Fwd IAT Max": 0.000004141666666666667,
  "Fwd IAT Min": 1.0833332250000109e-7,
  "Bwd IAT Std": 0.000003597410410317807,
  "Bwd IAT Max": 0.000004416666666666667,
  "Bwd IAT Min": 3.3333333333333334e-8,
  "PSH Flag Cnt": 1,
  "URG Flag Cnt": 0
};

function Packet() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) {
        console.error("MetaMask is not installed! Please install it.");
        return;
      }

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        setAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    connectWallet();
  }, []);

  const transactAlert = async (packetData) => {
    const { contract } = state;
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      const keys = Object.keys(packetData).filter((key) => key !== "isAlert");
      const values = keys.map((key) => packetData[key].toString());
      const isAlert = true;

      console.log("Storing Alert Packet:", { keys, values, isAlert });

      const transaction = await contract.storePacket(keys, values, isAlert);
      await transaction.wait();

      console.log("🚀 Transaction Successful! Alert packet stored on-chain.");
      return true;
    } catch (error) {
      console.error("Transaction failed:", error);
      return false;
    }
  };

  const [packets, setPackets] = useState([hardcodedData]);

  const { lastMessage, sendMessage } = useWebSocket("ws://10.181.171.195:5000/", {
    onOpen: () => {
      console.log("Connected to WebSocket");
      sendMessage(`INIT|${UID}`);
    },
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        let data = JSON.parse(lastMessage.data);
        let isAlert = false;

        if (typeof data === "string" && data.startsWith("ALERT")) {
          isAlert = true;
          data = JSON.parse(data.replace("ALERT", ""));
        }

        if (data && typeof data === "object") {
          setPackets((prev) => {
            const updatedPackets = [...prev, { ...data, isAlert }];
            return updatedPackets.slice(-MAX_PACKETS);
          });

          if (isAlert) {
            const userResponse = window.confirm(
              "⚠️ ALERT! Suspicious packet detected. Mitigate?"
            );
            sendMessage(userResponse ? "yes" : "no");

            if (userResponse) {
              console.log("✅ Waiting for OK from server...");
            }
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  }, [lastMessage, sendMessage]);

  useEffect(() => {
    if (lastMessage && lastMessage.data === "OK") {
      console.log("✅ Server approved mitigation. Starting blockchain transaction...");

      const lastPacket = packets[packets.length - 1];
      if (lastPacket.isAlert) {
        transactAlert(lastPacket).then((success) => {
          if (success) {
            console.log("✅ Blockchain transaction successful. Sending OK to server...");
            sendMessage("200");
          } else {
            console.error("❌ Blockchain transaction failed.");
          }
        });
      }
    }
  }, [lastMessage]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{padding:"1%"}}>Packet Data</h1>
        <div className="packet-container">
          {packets.map((packetData, index) => (
            <div key={index} className="packet">
              <h2>Packet {index + 1}</h2>
              <div className={`data-list ${packetData.isAlert ? "alert" : ""}`}>
                {Object.entries(packetData)
                  .filter(([key]) => key !== "isAlert")
                  .map(([key, value], i) => (
                    <div key={i} className="data-item">
                      <span className="data-key">{key}:</span>
                      <span className="data-value">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Packet;
