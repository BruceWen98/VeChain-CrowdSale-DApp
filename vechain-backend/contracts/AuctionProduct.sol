pragma solidity >=0.4.21 <0.6.0;

import "./BaseProduct.sol";
import "./CrowdSaleFactory.sol";

contract AuctionProduct is BaseProduct {
    uint internal minPrice;
    uint internal suggestedPrice;
    uint internal numberOfBids;
    uint internal averageBidPrice;
    bool internal auctionStatus;
    uint internal auctionEarnings;
    uint public numberOfWinner;
    CrowdSaleFactory public csf;
    // address[] public listBiders;
    BiderRequest[] internal listBidRequests;
    BiderRequest[] internal listWiners;
    mapping(address => BiderRequest) bids;

    struct BiderRequest {
        address biderWallet;
        uint value;
        uint time;
        bool isWiner;
    }
    constructor(
        string _productId, 
        string _sellerId, 
        string _productName, 
        string _description, 
        string _weblink,
        string _productCategory,
        uint _productAmount,
        uint _minPrice
    ) public {
        require(_productAmount > 0, "Product Amount cannot be null");
        require(_minPrice > 0, "Min price cannot be null");

        auction = true;
        auctionStatus = true;

        productId = _productId;
        sellerId = _sellerId;
        productName = _productName;
        description = _description;
        weblink = _weblink;
        productCategory = _productCategory;
        productAmount = _productAmount;
        minPrice = _minPrice;
        numberOfWinner = _productAmount;
        csf = CrowdSaleFactory(msg.sender);
    }
    
    /**
    * @dev fallback function ***DO NOT OVERRIDE***
    */
    function () external payable {
        _bid(msg.sender, msg.value);
    }

    function changeNumberOfWinner(uint _number) public onlyOwner returns (bool) {
        numberOfWinner = _number;
        return true;
    }

    function getListBiders() public view returns(address[], uint[], uint[]) {
        uint length = listBidRequests.length;
        address[] memory biders = new address[](length);
        uint[] memory values = new uint[](length);
        uint[] memory times = new uint[](length);

        for(uint i = 0; i < length; i++) {
            BiderRequest memory request = listBidRequests[i];
            biders[i] = request.biderWallet;
            values[i] = request.value;
            times[i] = request.time;
        }

        return (biders, values, times);
    }

    function getExtendedProductInfo() public view returns (
        string,uint, uint,uint,uint,uint,uint, bool
    ) {
        return (
            weblink,
            transaction,
            rating,
            minPrice,
            suggestedPrice,
            numberOfBids,
            averageBidPrice,
            auctionStatus
        );
    }

    function _bid(address _bider, uint _value) private {
        require(auctionStatus, "Auction is already closed");
        require(_bider != address(0));
        require(_value >= minPrice);

        BiderRequest memory request = BiderRequest(_bider,_value,now, false);

        if(bids[_bider].biderWallet == address(0)) {
            bids[_bider] = request;
        } else {
            BiderRequest memory currentBid = bids[_bider];
            currentBid.value += _value;
            currentBid.time = now;
        }

        suggestedPrice = _value > suggestedPrice?_value:suggestedPrice;
        listBidRequests.push(request);
        numberOfBids++;
    }

    function finishAuction(address[] _winers) public onlyAdmin returns (bool) {
        require(_winers.length == numberOfWinner, "Invalid winer addresses");

        auctionStatus = false;
        for (uint i = 0; i < _winers.length; i++) {
            if(_winers[i] != address(0)) {
                bids[_winers[i]].isWiner = true;
            }
        }

        // refund process for loss biders
        for(uint j = 0; j < listBidRequests.length; j++) {
            BiderRequest memory request = listBidRequests[j];
            if(!bids[request.biderWallet].isWiner) {
                request.biderWallet.transfer(request.value);
            }
        }

        (,,address wallet,) = csf.getSellerInfo(owner);
        wallet.transfer(address(this).balance);

        return true;
    }
}
