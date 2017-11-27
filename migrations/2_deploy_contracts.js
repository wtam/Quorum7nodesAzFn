//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");

//wtam@quorum7nodesdemo:/quorum-examples/examples/7nodes$ sudo su
//root@quorum7nodesdemo:/quorum-examples/examples/7nodes# ./init.sh
//root@quorum7nodesdemo:/quorum-examples/examples/7nodes# ./start.sh    Note:if starting node fail run ./stop.sh and re init and start again

//Before deployingthe contract make sure truffle is installed
var SimpleStorage = artifacts.require("SimpleStorage");

//Run truffle migrate --reset to force the deployment from scratch as truffle migrations keeps track of deployed contracts and by default it won't allow you to redeploy once it's deployed. 
module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  
  // Pass 42 to the contract as the first constructor parameter
  // https://blog.vjrantal.net/2017/05/12/testing-quorum-transaction-privacy-with-truffle/
  // Only node 7 can access this contract, "ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc=" is the node 7 TM Pub Key
  deployer.deploy(SimpleStorage, 42, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
  // OR Ethereum Txn.  As if use the same contract name for public and private (2 contract address), the public contract address below will be retrieved form the SimpleStorage.deployed()! So better keep both public and private contract in different name
  //deployer.deploy(SimpleStorage, 43)
};

// Get the truffle smart contract deployed address
// truffle console  
// truffle(development)> SimpleStorage.new().then(function(res) { sc = SimpleStorage.at(res.address) })
// truffle(development)> sc.address
// print the sc and compare the SimpleStorage.json
// truffle(development)>sc
