pragma solidity >=0.4.21 <0.6.0;

import "./Ownable.sol";

/**
 * @title Permission
 * @dev Define permission groups
 */
contract Permissions is Ownable {
    mapping(address=>bool) internal roles;
    address[] internal rolesGroup;
    
    uint constant internal MAX_GROUP_SIZE = 20;

    modifier onlyRole() {
        require(roles[msg.sender]);
        _;
    }

    function getRoles() internal view returns(address[] memory) {
        return rolesGroup;
    }

    function addRole(address _newPerson) internal onlyOwner {
        require(!roles[_newPerson]);
        require(rolesGroup.length < MAX_GROUP_SIZE);

        emit RoleAdded(_newPerson, true);
        roles[_newPerson] = true;
        rolesGroup.push(_newPerson);
    }

    function removeRole (address _person) internal onlyOwner {
        require(roles[_person]);
        roles[_person] = false;

        for (uint i = 0; i < rolesGroup.length; ++i) {
            if (rolesGroup[i] == _person) {
                rolesGroup[i] = rolesGroup[rolesGroup.length - 1];
                rolesGroup.length -= 1;
                emit RoleAdded(_person, false);
                break;
            }
        }
    }

    event RoleAdded(address _person, bool _isAdd);
}