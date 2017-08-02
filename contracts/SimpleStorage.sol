// Ref: http://truffleframework.com/tutorials/building-dapps-for-quorum-private-enterprise-blockchains 
pragma solidity ^0.4.8;

contract SimpleStorage {
  uint public storedData;

  event StoreValueUpdate (uint dataUpdate); 

  function SimpleStorage(uint initVal) {
    storedData = initVal;
  }

  function set(uint x) {
    storedData = x;
    StoreValueUpdate(storedData);
  }

  function get() constant returns (uint retVal) {
    return storedData;
  }
}