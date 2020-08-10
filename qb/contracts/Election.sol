pragma solidity ^0.5.12;

contract Election{
   
   uint public baCount;

    function getOwnerBalance(address accountAddress) public returns (uint) {
        baCount=accountAddress.balance;
        return accountAddress.balance;
    }

}
