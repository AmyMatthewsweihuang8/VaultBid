const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.CLOAKED_ENERGY_EXCHANGE_ADDRESS;

  if (!contractAddress || contractAddress === "") {
    console.error("❌ Contract address not found in .env");
    console.error("Please deploy the contract first: npx hardhat run scripts/deploy.js --network sepolia");
    process.exit(1);
  }

  console.log("📝 Creating test energy listings...");
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
      minPrice: 5000n
    },
    {
      energyType: "Wind Power Futures",
      details: "Offshore wind power futures contract. 250 MWh projected generation.",
      metadataHash: "QmWindPowerHash2",
      minPrice: 7500n
    },
    {
      energyType: "Hydro Energy Package",
      details: "Hydroelectric energy package from mountain reservoir. 150 MWh guaranteed.",
      metadataHash: "QmHydroEnergyHash3",
      minPrice: 6000n
    },
    {
      energyType: "Green Energy Bundle",
      details: "Mixed renewable energy bundle: 50% solar, 30% wind, 20% hydro. 200 MWh total.",
      metadataHash: "QmGreenBundleHash4",
      minPrice: 8000n
    }
  ];

  console.log("\n🔄 Creating listings...\n");

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];

    try {
      console.log(`Creating listing ${i + 1}/${listings.length}: ${listing.energyType}`);

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
  console.log("\n✅ Total listings created:", listingCount.toString());
  console.log("\n📊 Listing details:");

  for (let i = 1; i <= listingCount; i++) {
    const info = await contract.getListingInfo(i);
    const timeRemaining = await contract.getTimeRemaining(i);
    const endDate = new Date(Date.now() + Number(timeRemaining) * 1000);

    console.log(`\nListing #${i}: ${info[1]}`);
    console.log(`  Supplier: ${info[0]}`);
    console.log(`  Duration: 90 days`);
    console.log(`  End: ${endDate.toLocaleString()}`);
    console.log(`  Offers: ${info[7]}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
