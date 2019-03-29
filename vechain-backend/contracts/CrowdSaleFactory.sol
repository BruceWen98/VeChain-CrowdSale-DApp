pragma solidity >=0.4.21 <0.6.0;

import "./Seller.sol";
import "./BaseProduct.sol";
import "./Product.sol";
import "./AuctionProduct.sol";

contract CrowdSaleFactory is Seller {

    address[] internal listProductSales;
    mapping(address => SellerInfo) internal trustedSellers;
    mapping(address => BaseProduct[]) internal productSales;
    uint public pageNumber = 10;

    struct SellerInfo {
        string sellerName;
        string sellerId;
        address wallet;
        address seller;
        bool enable;
    }
    // uint public last_completed_migration;

    function changePageRecords(uint newPage) public onlyOwner returns (bool) {
        pageNumber = newPage;

        return true;
    }

    /**
     * Register to become certificate seller to sell product
     */
    function registerSeller (
        string _sellerName, 
        string _sellerId, 
        address _wallet,
        address _seller
    ) public onlyOwner {
        require(!trustedSellers[_seller].enable, "Seller is already added");
        trustedSellers[_seller] = SellerInfo(_sellerName, _sellerId, _wallet, _seller, true);

        addSeller(_seller);
    }

    function getSellerInfo(address _sellerAddress) public view returns (string,string,address,address) {
        SellerInfo memory seller = trustedSellers[_sellerAddress];
        return (seller.sellerName, seller.sellerId, seller.wallet, seller.seller);
    }

    function updateSellerInfo(address _wallet, address _seller) public onlyOwner {
        require(_wallet != address(0), "Invalid wallet address");
        require(_seller != address(0) , "Invalid seller address");

        SellerInfo storage seller = trustedSellers[_seller];
        seller.wallet = _wallet;
        seller.seller = _seller;
    }

    /**
     * disable a seller
     */
    function disableSeller (address _seller) public onlyOwner {
        require(trustedSellers[_seller].enable, "Seller is not active");
        SellerInfo storage seller = trustedSellers[_seller];
        seller.enable = false;
    }

    function createNewProduct (
        string _productId,
        string _sellerId,
        string _productName,
        string _description,
        string _weblink,
        string _productCategory,
        uint _productAmount,
        uint _price
    ) public onlySeller returns(address) {
        require(trustedSellers[msg.sender].enable, "Invalid Seller");

        Product product = new Product (
            _productId,
            _sellerId,
            _productName,
            _description,
            _weblink,
            _productCategory,
            _productAmount,
            _price
        );

        product.addAdmin(address(this));
        product.transferOwnership(msg.sender);

        listProductSales.push(product);
        productSales[msg.sender].push(product);
    }

    function createAuctionProduct (
        string _productId,
        string _sellerId,
        string _productName,
        string _description,
        string _weblink,
        string _productCategory,
        uint _productAmount,
        uint _minPrice
    ) public onlySeller returns(address) {
        require(trustedSellers[msg.sender].enable, "Seller is not active");

        AuctionProduct product = new AuctionProduct (
            _productId, 
            _sellerId, 
            _productName, 
            _description, 
            _weblink,
            _productCategory,
            _productAmount,
            _minPrice
        );

        product.addAdmin(address(this));
        product.transferOwnership(msg.sender);

        listProductSales.push(product);
        productSales[msg.sender].push(product);
    }

    function getAllProductList(uint _page) public view returns (address[]) {
        address[] memory ret = new address[](pageNumber);

        uint to = _page*pageNumber > listProductSales.length?listProductSales.length : _page*pageNumber;
        uint from = (_page - 1)*pageNumber;
        for(uint i = 0; from < to; from++) {
            ret[i] = listProductSales[from];
            i++;
        }

        return ret;
    }

    function getProductListOfSeller(uint _page) public view returns (address[]) {
        address[] memory ret = new address[](pageNumber);
        BaseProduct[] memory listProductSale = productSales[msg.sender];

        uint to = _page*pageNumber > listProductSale.length?listProductSale.length : _page*pageNumber;
        uint from = (_page - 1)*pageNumber;
        for(uint i = 0; from < to; from++) {
            ret[i] = listProductSale[from];
            i++;
        }

        return ret;
    }
}
