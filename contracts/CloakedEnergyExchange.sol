// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, ebool, euint64, externalEuint64} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract CloakedEnergyExchange is SepoliaConfig
{
    function version() external pure returns (string memory)
    {
        return "CloakedEnergyExchange/1.0.0";
    }

    enum ListingStatus {
        Active,
        Finalized,
        Cancelled,
        Completed
    }

    struct EnergyListing {
        uint256 listingId;
        address supplier;
        string energyType;
        string details;
        string metadataHash;
        ListingStatus status;
        uint256 openedAt;
        uint256 closesAt;
        euint64 minPrice;
        bool hasMinimum;
        euint64 topOffer;
        address topBidder;
        bool hasTopBid;
        uint256 offerCount;
        bool isCompleted;
    }

    struct Offer {
        uint256 offerId;
        uint256 listingId;
        address buyer;
        euint64 offerAmount;
        ebool meetsMinimum;
        ebool isLeading;
        uint256 submittedAt;
        bool isProcessed;
        bool isWithdrawn;
    }

    uint256 public listingCount;
    uint256 public offerCount;

    mapping(uint256 => EnergyListing) private listings;
    mapping(uint256 => Offer) private offers;
    mapping(uint256 => uint256[]) private listingOffers;
    mapping(address => uint256[]) private buyerOffers;

    uint256 public constant MIN_LISTING_DURATION = 1 hours;
    uint256 public constant MAX_LISTING_DURATION = 90 days;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed supplier,
        string energyType,
        uint256 closesAt
    );

    event OfferSubmitted(
        uint256 indexed offerId,
        uint256 indexed listingId,
        address indexed buyer,
        bytes32 offerHandle
    );

    event ListingFinalized(
        uint256 indexed listingId,
        address indexed winner,
        bytes32 topOfferHandle
    );

    event ListingCancelled(uint256 indexed listingId);

    event ListingCompleted(
        uint256 indexed listingId,
        address indexed winner,
        address indexed supplier
    );

    event OfferWithdrawn(uint256 indexed offerId, address indexed buyer);

    error ListingNotFound();
    error ListingNotActive();
    error ListingNotFinalized();
    error ListingAlreadyFinalized();
    error NotAuthorized();
    error InvalidDuration();
    error AlreadyProcessed();
    error NoWinningBid();
    error AlreadyCompleted();
    error CannotWithdrawOffer();

    modifier onlySupplier(uint256 listingId)
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.supplier != address(0), "listing not found");
        require(msg.sender == listing.supplier, "not supplier");
        _;
    }

    modifier listingActive(uint256 listingId)
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Active, "listing not active");
        require(block.timestamp < listing.closesAt, "listing closed");
        _;
    }

    modifier listingClosed(uint256 listingId)
    {
        EnergyListing storage listing = listings[listingId];
        require(
            block.timestamp >= listing.closesAt || listing.status == ListingStatus.Finalized,
            "listing not closed"
        );
        _;
    }

    function createListing(
        string calldata energyType,
        string calldata details,
        string calldata metadataHash,
        uint256 duration,
        externalEuint64 minPriceExt,
        bytes calldata proof
    )
        external
        returns (uint256 listingId)
    {
        require(
            duration >= MIN_LISTING_DURATION && duration <= MAX_LISTING_DURATION,
            "invalid duration"
        );
        require(proof.length > 0, "empty proof");

        euint64 minPrice = FHE.fromExternal(minPriceExt, proof);

        listingId = ++listingCount;
        EnergyListing storage listing = listings[listingId];

        listing.listingId = listingId;
        listing.supplier = msg.sender;
        listing.energyType = energyType;
        listing.details = details;
        listing.metadataHash = metadataHash;
        listing.status = ListingStatus.Active;
        listing.openedAt = block.timestamp;
        listing.closesAt = block.timestamp + duration;
        listing.minPrice = minPrice;
        listing.hasMinimum = true;
        listing.offerCount = 0;
        listing.hasTopBid = false;
        listing.isCompleted = false;

        FHE.allowThis(minPrice);
        FHE.allow(minPrice, msg.sender);

        emit ListingCreated(listingId, msg.sender, energyType, listing.closesAt);
    }

    function createListingPlaintext(
        string calldata energyType,
        string calldata details,
        string calldata metadataHash,
        uint256 duration,
        uint64 minPricePlain
    )
        external
        returns (uint256 listingId)
    {
        require(
            duration >= MIN_LISTING_DURATION && duration <= MAX_LISTING_DURATION,
            "invalid duration"
        );

        euint64 minPrice = FHE.asEuint64(minPricePlain);

        listingId = ++listingCount;
        EnergyListing storage listing = listings[listingId];

        listing.listingId = listingId;
        listing.supplier = msg.sender;
        listing.energyType = energyType;
        listing.details = details;
        listing.metadataHash = metadataHash;
        listing.status = ListingStatus.Active;
        listing.openedAt = block.timestamp;
        listing.closesAt = block.timestamp + duration;
        listing.minPrice = minPrice;
        listing.hasMinimum = true;
        listing.offerCount = 0;
        listing.hasTopBid = false;
        listing.isCompleted = false;

        FHE.allowThis(minPrice);
        FHE.allow(minPrice, msg.sender);

        emit ListingCreated(listingId, msg.sender, energyType, listing.closesAt);
    }

    function submitOffer(
        uint256 listingId,
        externalEuint64 offerAmountExt,
        bytes calldata proof
    )
        external
        listingActive(listingId)
        returns (uint256 offerId)
    {
        require(proof.length > 0, "empty proof");

        EnergyListing storage listing = listings[listingId];
        require(msg.sender != listing.supplier, "supplier cannot offer");

        euint64 offerAmount = FHE.fromExternal(offerAmountExt, proof);

        offerId = ++offerCount;
        Offer storage offer = offers[offerId];

        offer.offerId = offerId;
        offer.listingId = listingId;
        offer.buyer = msg.sender;
        offer.offerAmount = offerAmount;
        offer.submittedAt = block.timestamp;
        offer.isProcessed = false;
        offer.isWithdrawn = false;

        offer.meetsMinimum = FHE.ge(offerAmount, listing.minPrice);

        if (listing.offerCount == 0)
        {
            offer.isLeading = offer.meetsMinimum;
            listing.topOffer = offerAmount;
            listing.topBidder = msg.sender;
        }
        else
        {
            ebool isHigher = FHE.gt(offerAmount, listing.topOffer);
            offer.isLeading = FHE.and(offer.meetsMinimum, isHigher);
            listing.topOffer = FHE.select(offer.isLeading, offerAmount, listing.topOffer);

            if (listing.offerCount > 0)
            {
                listing.topBidder = msg.sender;
            }
        }

        listing.offerCount++;
        listing.hasTopBid = true;

        listingOffers[listingId].push(offerId);
        buyerOffers[msg.sender].push(offerId);

        FHE.allowThis(offerAmount);
        FHE.allowThis(offer.meetsMinimum);
        FHE.allowThis(offer.isLeading);
        FHE.allow(offerAmount, msg.sender);

        emit OfferSubmitted(offerId, listingId, msg.sender, FHE.toBytes32(offerAmount));
    }

    function finalizeListing(uint256 listingId)
        external
        listingClosed(listingId)
        onlySupplier(listingId)
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Active, "already finalized");

        listing.status = ListingStatus.Finalized;

        if (listing.hasTopBid)
        {
            FHE.allow(listing.topOffer, listing.topBidder);
            FHE.allow(listing.topOffer, listing.supplier);
            FHE.makePubliclyDecryptable(listing.topOffer);

            emit ListingFinalized(
                listingId,
                listing.topBidder,
                FHE.toBytes32(listing.topOffer)
            );
        }
        else
        {
            emit ListingFinalized(listingId, address(0), bytes32(0));
        }
    }

    function cancelListing(uint256 listingId)
        external
        onlySupplier(listingId)
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Active, "cannot cancel");
        require(listing.offerCount == 0, "has offers");

        listing.status = ListingStatus.Cancelled;
        emit ListingCancelled(listingId);
    }

    function completeListing(uint256 listingId)
        external
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Finalized, "not finalized");
        require(listing.hasTopBid, "no winner");
        require(!listing.isCompleted, "already completed");
        require(
            msg.sender == listing.supplier || msg.sender == listing.topBidder,
            "not authorized"
        );

        listing.status = ListingStatus.Completed;
        listing.isCompleted = true;

        emit ListingCompleted(listingId, listing.topBidder, listing.supplier);
    }

    function withdrawOffer(uint256 offerId)
        external
    {
        Offer storage offer = offers[offerId];
        require(offer.buyer == msg.sender, "not your offer");
        require(!offer.isWithdrawn, "already withdrawn");

        EnergyListing storage listing = listings[offer.listingId];
        require(
            listing.status == ListingStatus.Finalized ||
            listing.status == ListingStatus.Completed,
            "listing not finalized"
        );
        require(listing.topBidder != msg.sender, "cannot withdraw winning offer");

        offer.isWithdrawn = true;

        emit OfferWithdrawn(offerId, msg.sender);
    }

    function getListingInfo(uint256 listingId)
        external
        view
        returns (
            address supplier,
            string memory energyType,
            string memory details,
            string memory metadataHash,
            ListingStatus status,
            uint256 openedAt,
            uint256 closesAt,
            uint256 offerCount,
            address topBidder,
            bool hasTopBid
        )
    {
        EnergyListing storage listing = listings[listingId];
        return (
            listing.supplier,
            listing.energyType,
            listing.details,
            listing.metadataHash,
            listing.status,
            listing.openedAt,
            listing.closesAt,
            listing.offerCount,
            listing.topBidder,
            listing.hasTopBid
        );
    }

    function getOfferInfo(uint256 offerId)
        external
        view
        returns (
            uint256 listingId,
            address buyer,
            uint256 submittedAt,
            bool isProcessed,
            bool isWithdrawn
        )
    {
        Offer storage offer = offers[offerId];
        return (
            offer.listingId,
            offer.buyer,
            offer.submittedAt,
            offer.isProcessed,
            offer.isWithdrawn
        );
    }

    function getMinPriceHandle(uint256 listingId)
        external
        view
        returns (bytes32)
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.hasMinimum, "no minimum");
        return FHE.toBytes32(listing.minPrice);
    }

    function getTopOfferHandle(uint256 listingId)
        external
        view
        returns (bytes32)
    {
        EnergyListing storage listing = listings[listingId];
        require(listing.hasTopBid, "no top bid");
        return FHE.toBytes32(listing.topOffer);
    }

    function getOfferAmountHandle(uint256 offerId)
        external
        view
        returns (bytes32)
    {
        Offer storage offer = offers[offerId];
        return FHE.toBytes32(offer.offerAmount);
    }

    function getListingOffers(uint256 listingId)
        external
        view
        returns (uint256[] memory)
    {
        return listingOffers[listingId];
    }

    function getBuyerOffers(address buyer)
        external
        view
        returns (uint256[] memory)
    {
        return buyerOffers[buyer];
    }

    function isListingActive(uint256 listingId)
        external
        view
        returns (bool)
    {
        EnergyListing storage listing = listings[listingId];
        return listing.status == ListingStatus.Active && block.timestamp < listing.closesAt;
    }

    function getTimeRemaining(uint256 listingId)
        external
        view
        returns (uint256)
    {
        EnergyListing storage listing = listings[listingId];
        if (block.timestamp >= listing.closesAt) return 0;
        return listing.closesAt - block.timestamp;
    }
}
