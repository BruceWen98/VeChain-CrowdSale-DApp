pragma solidity >=0.4.21 <0.6.0;

import "./Permissions.sol";

/**
 * @title Permission
 * @dev Define permission groups
 */
contract Admin is Permissions {
    modifier onlyAdmin() {
        require(roles[msg.sender] || msg.sender == owner);
        _;
    }

    function addAdmin(address _newAdmin) public onlyOwner returns (bool){
        addRole(_newAdmin);
        return true;
    }

    function getAdmins() public view returns (address[]) {
        return getRoles();
    }
}    
