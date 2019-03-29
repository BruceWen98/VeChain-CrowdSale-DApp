const CrowdSaleFactory = artifacts.require("CrowdSaleFactory");
// const Product = artifacts.require("Product");

module.exports = function(deployer) {
  deployer.deploy(CrowdSaleFactory);
  // let arg = [];
  // arg.push("Test Product");
  // arg.push(100000000000000000);

  // deployer.deploy(Product,
  //   "ProductID",
  //   "SellerID",
  //   "Test Product",
  //   "Test Product",
  //   "Test Product",
  //   100000000000000000);
};
