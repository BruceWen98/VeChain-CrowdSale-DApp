pragma solidity >=0.4.21 <0.6.0;

import "./Permissions.sol";

/**
 * @title Permission
 * @dev Define permission groups
 */
contract Seller is Permissions {
    modifier onlySeller() {
        require(roles[msg.sender] || msg.sender == owner);
        _;
    }
    function addSeller(address _newSeller) internal onlyOwner returns (bool){
        addRole(_newSeller);

        return true;
    }
    function getSellers() public view returns (address[]) {
        return getRoles();
    }
}    
