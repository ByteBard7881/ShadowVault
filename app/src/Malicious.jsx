import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ethers } from "ethers";
import abi from "./contractJson/AlertPacketStorage.json";
import "./App.css";

const CONTRACT_ADDRESS = "0x67E650C30402e4B94a0A7206422896D40b0916D7";
const CONTRACT_ABI = abi.abi;

function Malicious() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not Connected");
  const [packets, setPackets] = useState([]);

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

  const fetchPackets = async () => {
    if (!state.contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      const alertPacketIds = await state.contract.getAllAlertPacketIds();
      console.log("Alert Packet IDs:", alertPacketIds);

      let fetchedPackets = [];
      for (let id of alertPacketIds) {
        const [keys, values] = await state.contract.getAlertPacket(id);
        let packetData = {};
        keys.forEach((key, index) => {
          packetData[key] = values[index];
        });
        fetchedPackets.push({ id, data: packetData });
      }

      console.log("Fetched Packets:", fetchedPackets);
      setPackets(fetchedPackets);
    } catch (error) {
      console.error("Error fetching packets:", error);
    }
  };

  useEffect(() => {
    if (state.contract) {
      fetchPackets();
    }
  }, [state.contract]);

  return (
    <div>
      <Navbar />
      <h1 className="mal-text" style={{ padding: "1%" }}>Malicious Packets</h1>
      <div className="container mal-container">
        <button className="malButton" onClick={fetchPackets}>
          Refresh Packets
        </button>
        <div>
          <div className="packet-container">
            {packets.length > 0 ? (
              packets.map((packet) => (
                <div key={packet.id} className="packet">
                  <h2>Packet ID: {packet.id}</h2>
                  <div className="data-list alert-list">
                    {Object.entries(packet.data).map(([key, value], index) => (
                      <div key={index} className="data-item">
                        <span className="data-key">{key}:</span>
                        <span className="data-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No malicious packets found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Malicious;
