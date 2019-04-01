"use strict"

const address = "0x00c307a02f68c1A5dd9232C1150983F482a5d173";
const CSFABI = [{"constant":true,"inputs":[],"name":"getSellers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pageNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_person","type":"address"},{"indexed":false,"name":"_isAdd","type":"bool"}],"name":"RoleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"newPage","type":"uint256"}],"name":"changePageRecords","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sellerName","type":"string"},{"name":"_sellerId","type":"string"},{"name":"_wallet","type":"address"},{"name":"_seller","type":"address"}],"name":"registerSeller","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_sellerAddress","type":"address"}],"name":"getSellerInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"address"},{"name":"_seller","type":"address"}],"name":"updateSellerInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_seller","type":"address"}],"name":"disableSeller","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_sellerId","type":"string"},{"name":"_productName","type":"string"},{"name":"_description","type":"string"},{"name":"_weblink","type":"string"},{"name":"_productCategory","type":"string"},{"name":"_productAmount","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"createNewProduct","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_productId","type":"string"},{"name":"_sellerId","type":"string"},{"name":"_productName","type":"string"},{"name":"_description","type":"string"},{"name":"_weblink","type":"string"},{"name":"_productCategory","type":"string"},{"name":"_productAmount","type":"uint256"},{"name":"_minPrice","type":"uint256"}],"name":"createAuctionProduct","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getAllProductList","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_page","type":"uint256"}],"name":"getProductListOfSeller","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}];

const CrowdSaleFactory = function () {
    this.abi = CSFABI;
    this.address = address;
    this.namedABI = new Map();
    this.sellers = [];

    this.constructor.superclass_.init();
    this.init();
}

Util.inherit(CrowdSaleFactory, Connex)

CrowdSaleFactory.prototype.init = function () {
    Util.applyFunction(this, this.abi);

    this.getListSellers().then((listSellers) => {
        this.sellers = listSellers;
    });
}

CrowdSaleFactory.prototype.getListSellers = async function () {
    let sellers = await this.getSellers();
    sellers = sellers.decoded[0];
    let listSellers = [];

    for(let i = 0; i < sellers.length; i++) {
        let sellerInfo = await this.getSellerInfo(sellers[i]);
        sellerInfo = sellerInfo.decoded;
        let seller = {};
        seller.sellerName = sellerInfo[0];
        seller.sellerId = sellerInfo[1];
        seller.wallet = sellerInfo[2];
        seller.seller = sellerInfo[3];

        listSellers.push(seller);
    }

    return listSellers;
}

CrowdSaleFactory.prototype.getListProducts = async function (page) {
    let listProducts = await this.getAllProductList(page);
    let products = [];

    for(let i = 0; i < listProducts.decoded[0].length; i++) {
        let p = listProducts.decoded[0][i];
        if(p != "0x0000000000000000000000000000000000000000") {
            let product = new Product(p);
            let info = await product.getBasicInfo();
            let productInfo = Util.convertProduct(info.decoded);
            let extendInfo = await product.getExtendedProductInfo();
            extendInfo = extendInfo.decoded;
            productInfo.address = p;

            if(productInfo.auction) {
                product = new AuctionProduct(p);
                extendInfo = await product.getExtendedProductInfo();
                console.log(extendInfo);
                extendInfo = extendInfo.decoded;
                // weblink,
                // transaction,
                // rating,
                // minPrice,
                // suggestedPrice,
                // numberOfBids,
                // averageBidPrice,
                // auctionStatus
                productInfo.weblink = extendInfo[0];
                productInfo.transaction = extendInfo[1];
                productInfo.rating = extendInfo[2];
                productInfo.minPrice = extendInfo[3];
                productInfo.suggestedPrice = extendInfo[4];
                productInfo.numberOfBids = extendInfo[5];
                productInfo.averageBidPrice = extendInfo[6];
                productInfo.auctionStatus = extendInfo[7];
            } else {
                productInfo.weblink = extendInfo[0];
                productInfo.transaction = extendInfo[1];
                productInfo.price = extendInfo[2];
                productInfo.saleStatus = extendInfo[3];
                console.log(productInfo);
            }
            // console.log(info);
            products.push(productInfo);
        }
    }
    
    return products;
}



// Create Crowd Sale Factory object to call smart contract
window.CSF = new CrowdSaleFactory();