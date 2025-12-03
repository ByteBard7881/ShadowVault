// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AlertPacketStorage {
    struct Packet {
        mapping(string => string) data;
        bool isAlert;
    }

    mapping(uint256 => Packet) private packets;
    uint256 private nextId = 1;
    uint256[] private alertPacketIds;

    event PacketStored(uint256 indexed id, bool isAlert);

    function storePacket(
        string[] memory keys, 
        string[] memory values, 
        bool _isAlert
    ) public {
        require(keys.length == values.length, "Keys and values length mismatch");

        Packet storage newPacket = packets[nextId];
        for (uint256 i = 0; i < keys.length; i++) {
            newPacket.data[keys[i]] = values[i];
        }
        newPacket.isAlert = _isAlert;

        if (_isAlert) {
            alertPacketIds.push(nextId);
        }

        emit PacketStored(nextId, _isAlert);
        nextId++;
    }

    function getAlertPacket(uint256 packetId) public view returns (string[] memory, string[] memory) {
        require(packets[packetId].isAlert, "Packet is not an alert");

        uint256 size = 18;
        string[] memory keys = new string[](size);
        string[] memory values = new string[](size);

        keys[0] = "Flow Duration";
        keys[1] = "Tot Fwd Pkts";
        keys[2] = "Tot Bwd Pkts";
        keys[3] = "Fwd Pkt Len Max";
        keys[4] = "Fwd Pkt Len Min";
        keys[5] = "Fwd Pkt Len Std";
        keys[6] = "Bwd Pkt Len Max";
        keys[7] = "Bwd Pkt Len Min";
        keys[8] = "Bwd Pkt Len Std";
        keys[9] = "Fwd IAT Std";
        keys[10] = "Fwd IAT Max";
        keys[11] = "Fwd IAT Min";
        keys[12] = "Bwd IAT Std";
        keys[13] = "Bwd IAT Max";
        keys[14] = "Bwd IAT Min";
        keys[15] = "PSH Flag Cnt";
        keys[16] = "URG Flag Cnt";
        keys[17] = "isAlert";

        for (uint256 i = 0; i < size; i++) {
            values[i] = packets[packetId].data[keys[i]];
        }

        return (keys, values);
    }

    function getAllAlertPacketIds() public view returns (uint256[] memory) {
        return alertPacketIds;
    }
}
