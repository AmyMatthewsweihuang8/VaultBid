const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying CloakedEnergyExchange contract...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");

  const CloakedEnergyExchange = await hre.ethers.getContractFactory("CloakedEnergyExchange");

  console.log("⏳ Deploying contract...");
  const contract = await CloakedEnergyExchange.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("✅ CloakedEnergyExchange deployed to:", contractAddress);

  const envPath = path.join(__dirname, "..", ".env");
  let envContent = fs.readFileSync(envPath, "utf8");

  envContent = envContent.replace(
    /CLOAKED_ENERGY_EXCHANGE_ADDRESS=.*/,
    `CLOAKED_ENERGY_EXCHANGE_ADDRESS=${contractAddress}`
  );

  fs.writeFileSync(envPath, envContent);
  console.log("📝 Updated .env file with contract address");

  const frontendEnvPath = path.join(__dirname, "..", "frontend", ".env");
  if (fs.existsSync(frontendEnvPath)) {
    let frontendEnv = fs.readFileSync(frontendEnvPath, "utf8");
    frontendEnv = frontendEnv.replace(
      /VITE_CONTRACT_ADDRESS=.*/,
      `VITE_CONTRACT_ADDRESS=${contractAddress}`
    );
    fs.writeFileSync(frontendEnvPath, frontendEnv);
    console.log("📝 Updated frontend/.env with contract address");
  }

  console.log("\n🎉 Deployment complete!");
  console.log("\nContract Address:", contractAddress);
  console.log("Network:", hre.network.name);
  console.log("Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);

  console.log("\n⏳ Waiting 30 seconds before verification...");
  await new Promise((resolve) => setTimeout(resolve, 30000));

  try {
    console.log("\n🔍 Verifying contract on Etherscan...");
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("✅ Contract verified on Etherscan");
  } catch (error) {
    console.log("⚠️ Verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
