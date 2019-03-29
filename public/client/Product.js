"use strict"

const PABI = [{"constant":true,"inputs":[],"name":"getAdmins","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"}],"name":"addAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBasicInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"csf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_productId","type":"string"},{"name":"_sellerId","type":"string"},{"name":"_productName","type":"string"},{"name":"_description","type":"string"},{"name":"_weblink","type":"string"},{"name":"_productCategory","type":"string"},{"name":"_productAmount","type":"uint256"},{"name":"_price","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_person","type":"address"},{"indexed":false,"name":"_isAdd","type":"bool"}],"name":"RoleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_saleStatus","type":"bool"}],"name":"enableSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_rating","type":"uint256"}],"name":"updateRating","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExtendedProductInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBuyRequests","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const Product = function (address) {
    this.abi = PABI;
    this.address = address;
    this.namedABI = new Map();

    this.constructor.superclass_.init();
    this.init();
}

Util.inherit(Product, Connex);

Product.prototype.init = function () {
    Util.applyFunction(this, this.abi);
}

Product.prototype.getProductInfo = async function () {
    let info = await this.getBasicInfo();
    let extendInfo = await this.getExtendedProductInfo();

    let productInfo = Util.convertProduct(info.decoded);
    if(productInfo.auction) {
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
        productInfo.auctionStatus = extendInfo[6];
    } else {
        productInfo.weblink = extendInfo[0];
        productInfo.transaction = extendInfo[1];
        productInfo.price = extendInfo[2];
    }

    return productInfo;
}

Product.prototype.getBuyHistory = async function () {
    let buyRequests = await this.getBuyRequests();
    buyRequests = buyRequests.decoded;

    let buyers = buyRequests[0];
    let quantities = buyRequests[1];
    let amounts = buyRequests[2];
    let times = buyRequests[3];

    let requests = [];

    for(let i = 0; i < buyers.length; i++) {
        let request = {};
        request.buyer = buyers[i];
        request.quantity = quantities[i];
        request.amount = amounts[i];
        request.time = times[i];

        requests.push(request);
    }
    // console.log(requests);

    return requests;
}

// let product = new Product("0xEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");