"use strict"

const AUPABI = [{"constant":true,"inputs":[],"name":"getAdmins","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"}],"name":"addAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numberOfWinner","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBasicInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"csf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_productId","type":"string"},{"name":"_sellerId","type":"string"},{"name":"_productName","type":"string"},{"name":"_description","type":"string"},{"name":"_weblink","type":"string"},{"name":"_productCategory","type":"string"},{"name":"_productAmount","type":"uint256"},{"name":"_minPrice","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_person","type":"address"},{"indexed":false,"name":"_isAdd","type":"bool"}],"name":"RoleAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_number","type":"uint256"}],"name":"changeNumberOfWinner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getListBiders","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getExtendedProductInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_winers","type":"address[]"}],"name":"finishAuction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const AuctionProduct = function (address) {
    this.abi = AUPABI;
    this.address = address;
    this.namedABI = new Map();

    this.constructor.superclass_.init();
    this.init();
}

Util.inherit(AuctionProduct, Connex)

AuctionProduct.prototype.init = function () {
    Util.applyFunction(this, this.abi);
}

AuctionProduct.prototype.getBidHistory = async function () {
    let buyRequests = await this.getListBiders();
    buyRequests = buyRequests.decoded;

    let buyers = buyRequests[0];
    let values = buyRequests[1];
    let times = buyRequests[2];

    let requests = [];

    for(let i = 0; i < buyers.length; i++) {
        let request = {};
        request.bider = buyers[i];
        request.value = values[i];
        request.time = times[i];

        requests.push(request);
    }
    // console.log(requests);

    return requests;
}
AuctionProduct.prototype.getProductInfo = async function () {
    let info = await this.getBasicInfo();
    let extendInfo = await this.getExtendedProductInfo();
    let productInfo = Util.convertProduct(info.decoded);
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

    return productInfo;
}
// create default object, in programing, it's dynamic create when user click on each product
// let auction = new AuctionProduct("0xEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");