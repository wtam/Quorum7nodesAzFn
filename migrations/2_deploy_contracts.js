var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  
  // Pass 42 to the contract as the first constructor parameter
  // https://blog.vjrantal.net/2017/05/12/testing-quorum-transaction-privacy-with-truffle/
  // Only node 7 can access this contract, "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc=" is the node 7 TM Pub Key
  deployer.deploy(SimpleStorage, 42, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
};
