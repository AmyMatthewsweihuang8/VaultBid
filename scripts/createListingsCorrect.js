const hre = require("hardhat");
const { parseEther } = require("ethers");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.CLOAKED_ENERGY_EXCHANGE_ADDRESS;

  if (!contractAddress || contractAddress === "") {
    console.error("❌ Contract address not found in .env");
    process.exit(1);
  }

  console.log("📝 Creating energy listings with correct ETH prices...");
  console.log("Contract:", contractAddress);

  const [signer] = await hre.ethers.getSigners();
  console.log("Using account:", signer.address);

  const CloakedEnergyExchange = await hre.ethers.getContractFactory("CloakedEnergyExchange");
  const contract = CloakedEnergyExchange.attach(contractAddress);

  const durationInSeconds = 90 * 24 * 60 * 60;

  const listings = [
    {
      energyType: "Solar Energy Credits",
      details: "Premium solar energy credits from certified renewable sources. 100 MWh capacity.",
      metadataHash: "QmSolarEnergyHash1",
      minPrice: parseEther("0.25") // 0.25 ETH
    },
    {
      energyType: "Wind Power Futures",
      details: "Offshore wind power futures contract. 250 MWh projected generation.",
      metadataHash: "QmWindPowerHash2",
      minPrice: parseEther("0.45") // 0.45 ETH
    },
    {
      energyType: "Hydro Energy Package",
      details: "Hydroelectric energy package from mountain reservoir. 150 MWh guaranteed.",
      metadataHash: "QmHydroEnergyHash3",
      minPrice: parseEther("0.68") // 0.68 ETH
    },
    {
      energyType: "Green Energy Bundle",
      details: "Mixed renewable energy bundle: 50% solar, 30% wind, 20% hydro. 200 MWh total.",
      metadataHash: "QmGreenBundleHash4",
      minPrice: parseEther("0.92") // 0.92 ETH
    }
  ];

  console.log("\n🔄 Creating listings with correct prices...\n");

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];

    try {
      console.log(`Creating listing ${i + 1}/${listings.length}: ${listing.energyType}`);
      console.log(`  Min price: ${hre.ethers.formatEther(listing.minPrice)} ETH`);

      const tx = await contract.createListingPlaintext(
        listing.energyType,
        listing.details,
        listing.metadataHash,
        durationInSeconds,
        listing.minPrice
      );

      console.log("  Transaction hash:", tx.hash);
      const receipt = await tx.wait();
      console.log("  ✅ Confirmed in block:", receipt.blockNumber);

      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`  ❌ Failed to create listing: ${error.message}`);
    }
  }

  const listingCount = await contract.listingCount();
  console.log("\n✅ Total listings on chain:", listingCount.toString());
  console.log("\n📊 All listing details:");

  for (let i = 1; i <= listingCount; i++) {
    const info = await contract.getListingInfo(i);
    const timeRemaining = await contract.getTimeRemaining(i);
    const endDate = new Date(Date.now() + Number(timeRemaining) * 1000);

    console.log(`\nListing #${i}: ${info[1]}`);
    console.log(`  Supplier: ${info[0]}`);
    console.log(`  Details: ${info[2]}`);
    console.log(`  End: ${endDate.toLocaleString()}`);
    console.log(`  Offers: ${info[7]}`);
    console.log(`  Status: ${info[4] === 0 ? 'Active' : 'Inactive'}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
