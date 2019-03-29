pragma solidity >=0.4.21 <0.6.0;

import "./SafeMath.sol";
import "./Admin.sol";

contract BaseProduct is Admin {
    using SafeMath for uint256;

    string internal productId;
    string internal sellerId;
    string internal productName;
    string internal description;
    string internal weblink;
    string internal productCategory;

    uint internal transaction; // transaction fee mode
    bool internal auction; // if product is auction product
    uint internal productAmount; // total product to sale
    uint internal numberSold;
    uint internal rating;

    function getBasicInfo() public view returns (
        string, string, string, string,string, bool, uint,uint
    ){
        return (
            productId,
            sellerId,
            productName, 
            description, 
            productCategory,
            auction,
            productAmount,
            numberSold
        );
    }
}
