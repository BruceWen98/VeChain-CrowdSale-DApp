function displaySeller () {

}

function registerSeller() {
    let sellerName = "Seller";
    let sellerID = "SellerID";
    let wallet = "0xc8367bab4d0e61a53fdf3d637c5e8d32c8ad9e7f";
    let seller = "0xc8367bab4d0e61a53fdf3d637c5e8d32c8ad9e7f";

    window.CSF.registerSeller(sellerName, sellerID, wallet, seller).then(output => {
        log(output);
    })
}

function getListSellers() {
    window.CSF.getListSellers().then(output => {
        log(output);
    });
}

function getProductList() {
    window.CSF.getListProducts(1).then(output => {
        log(output);
    });
}

function getProductInfo() {
    let address = $("#productAddress").val();    
    if(!address || address == "") alert("Input address value to get info");
    let product = new Product(address);
    product.getProductInfo().then(output => {
        log(output);
    });
}
function getAuctionProductInfo() {
    let address = $("#auctionProductAddress").val();    
    if(!address || address == "") alert("Input address value to get info");
    let product = new Product(address);
    product.getProductInfo().then(output => {
        log(output);
    });
}

function getBuyHistory() {
    let address = $("#productAddress").val();    
    if(!address || address == "") alert("Input address value to get info");
    let product = new Product(address);
    product.getBuyHistory().then(output => {
        log(output);
    });
}

function getBidHistory() {
    let address = $("#auctionProductAddress").val();    
    if(!address || address == "") alert("Input address value to get info");
    let product = new AuctionProduct(address);
    product.getBidHistory().then(output => {
        log(output);
    });
}

function finishProductSale() {
    let address = $("#productAddress").val();    
    if(!address || address == "") alert("Input address value to get info");
    let product = new Product(address);
    product.finishSale().then(output => {
        log(output);
    });
}

function finishAuctionSale() {
    let address = $("#auctionProductAddress").val();    
    let winers = $("#winerAddress").val().split(",");    
    if(!address || address == "") alert("Input address value to get info");
    let product = new AuctionProduct(address);

    product.finishAuction(winers).then(output => {
        log(output);
    });
}

function createNewProduct() {
    let _productId = "Product Id";
    let _sellerId = "SellerId";
    let _productName = "Test Product";
    let _description = "Product for crowsale";
    let _weblink = "https://morpheuslabs.io/product/1000";
    let _productCategory = "CAT01";
    let _productAmount = 200;
    let _price = Util.numberToWei(10);


    let promise = window.CSF.createNewProduct(_productId, _sellerId,_productName,_description,
        _weblink,_productCategory,_productAmount,_price);

    promise.then((output) => {
        log(output);
    });
}

function createAutionProduct() {
    let _productId = "Product Id";
    let _sellerId = "SellerId";
    let _productName = "Auction Product";
    let _description = "Product for crowsale";
    let _weblink = "https://morpheuslabs.io/product/1000";
    let _productCategory = "CAT01";
    let _productAmount = 200;
    let _minPrice = Util.numberToWei(10);


    let promise = window.CSF.createAuctionProduct(_productId, _sellerId,_productName,_description,
        _weblink,_productCategory,_productAmount,_minPrice);

    promise.then((output) => {
        log(output);
    });
}

function log(log) {
    let p = $("<p></p>").html(JSON.stringify(log));
    $("#console").prepend(p);
}

function test() {
    let result = CSF.getProductListInfo(1);
    result.then(output => {
        console.log("return values", output)
    });
}