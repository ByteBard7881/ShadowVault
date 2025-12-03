const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const StorageFactory = await ethers.getContractFactory("AlertPacketStorage");

  console.log("[+] Initiating smart contract deployment...");
  const storage = await StorageFactory.deploy();
  await storage.waitForDeployment();

  const contractAddress = await storage.getAddress();
  console.log(
    `[+] Smart contract successfully deployed at: ${contractAddress}`
  );

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("[~] Awaiting block confirmations before verification...");
    await storage.deploymentTransaction().wait(6);
    await verify(contractAddress, []);
  } else {
    console.log(
      "[!] Contract verification skipped: ETHERSCAN_API_KEY not provided."
    );
  }
}

async function verify(contractAddress, args) {
  console.log("[+] Initiating contract verification on Etherscan...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("[+] Contract successfully verified on Etherscan.");
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("[!] Contract is already verified.");
    } else {
      console.log("[!] Verification failed due to an error:", e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[!] Deployment script encountered an error:", error);
    process.exit(1);
  });
