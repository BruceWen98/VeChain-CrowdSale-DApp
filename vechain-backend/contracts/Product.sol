pragma solidity >=0.4.21 <0.6.0;

import "./BaseProduct.sol";
import "./CrowdSaleFactory.sol";

contract Product is BaseProduct {
    uint internal price;
    bool internal saleStatus;
    CrowdSaleFactory public csf;

    struct BuyerRequest {
        address buyer;
        uint quantity;
        uint amount;
        uint time;
    }

    BuyerRequest[] internal listBuyers;

    constructor(
        string _productId,
        string _sellerId,
        string _productName,
        string _description,
        string _weblink,
        string _productCategory,
        uint _productAmount,
        uint _price
    ) public {
        price = _price;
        productId = _productId;
        sellerId = _sellerId;
        productName = _productName;
        description = _description;
        weblink = _weblink;
        productCategory = _productCategory;
        productAmount = _productAmount;
        auction = false;
        saleStatus = true;
        csf = CrowdSaleFactory(msg.sender);
    }

    function () external payable {
        _buy(msg.sender, msg.value);
    }

    function enableSale(bool _saleStatus) public onlyOwner returns (bool) {
        saleStatus = _saleStatus;
        return saleStatus;
    }
     
    function updateRating(uint _rating) public {
        rating = _rating;
    }

    function getExtendedProductInfo() public view returns (
        string, uint, uint, bool
    ) {
        return (
            weblink,
            transaction,
            price,
            saleStatus
        );
    }

    /**
     */
    function getBuyRequests() public view returns(address[], uint[], uint[], uint[]) {
        address[] memory buyers = new address[](listBuyers.length);
        uint[] memory quantities = new uint[](listBuyers.length);
        uint[] memory amounts = new uint[](listBuyers.length);
        uint[] memory times = new uint[](listBuyers.length);

        for(uint i = 0; i < listBuyers.length; i++) {
            BuyerRequest memory request = listBuyers[i];
            buyers[i] = request.buyer;
            quantities[i] = request.quantity;
            amounts[i] = request.amount;
            times[i] = request.time;
        }

        return (buyers, quantities, amounts, times);
    }

    /**
     */
    function finishSale() public onlyAdmin returns(bool) {
        // send all money to seller wallet
        require(saleStatus, "Product sale is not enable yet");
        saleStatus = false;
        
        (,,address wallet,) = csf.getSellerInfo(owner);
        wallet.transfer(address(this).balance);
    }

    function _buy(address _buyer, uint _amount) private {
        require(saleStatus, "Product sale is not enable yet");
        require(_amount >= price, "Sending money is not enough to buy product");
        require(_buyer != address(0));

        uint quantity = _amount.div(price);
        // request = ;
        listBuyers.push(BuyerRequest(_buyer, quantity, _amount, now));
        numberSold += quantity;
    }
}
