// [Important] 1. start the Quorum node on Azure: cd ../../quorum-examples/examples/7nodes$, sudo su, ./init.sh, ./start.sh
// 2. "truffle migrate" under migrations folder which set initial value to 42 for node 1 and 7 (private to node 1 & 7)
// 3. "truffle exec QuorumTx.js" (this JS) will update the value being set to 65 (only for node 1 & 7 )
// checking the value: 
//    $ truffle console  or E.g. truffle console --netowrk nodefour
//    > SimpleStorage.deployed().then(function(instance) { return instance.get(); })
//      OR
//    > SimpleStorage.deployed().then(function(instance) { return instance.set(3, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}) })
// NoteL need the latest Quorum geth and bootnode and replace its under /usr/local/bin to get the watch work!

// Note: if the initial migrate(2_deploy_simplestorage.js), step 2 didn't specify the privatefor, all node can see the contract, then this script won't able to update
//
// Additional: running cakeshop on the Quorum7nodesDemo vm: 
// - sudo su, cd /opt
// - git clone https://github.com/jpmorganchase/cakeshop.git (clone cakeshop)
//
// ---To Run the cakeshop in attach mode - attach to exisitng network: https://github.com/jpmorganchase/cakeshop/wiki/Getting-Started#attach-mode
// --- Edit :/opt/cakeshop/data/local/application.properties
// --- geth.url=http\://localhost\:22000 
//
// - apt install docker.io  (to install docker )
// - sudo su, cd /opt/cakeshop, docker run -p 8080:8080 -v "$PWD/data":/opt/cakeshop/data jpmc/cakeshop
// cd 7nodes,  docker run -p 8080:8080 -v "$PWD/qdata/":/opt/cakeshop/data jpmc/cakeshop
// - Browser: http://quorumdemo7nodes.eastasia.cloudapp.azure.com:8080/cakeshop

//var SimpleStorage = artifacts.require("SimpleStorage");
const contract = require('truffle-contract');
 
// smart contract artifact
const simpleStorage_json = require('./build/contracts/SimpleStorage.json')
// ABI abstraction
const SimpleStorage = contract(simpleStorage_json);
//console.log(SimpleStorage);

//Set the Web3 HttpProvider in Truffle-Contract
var web3 = require('ethereum.js');
SimpleStorage.setProvider(new web3.providers.HttpProvider('http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000'));

//Set the Acct default address; othjerwise will get Invalid Address Error
var account_one = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"; // node1 acct key. Refer to /quorum-examples/examples/7nodes/keys$
SimpleStorage.defaults({from: account_one});

//module.exports = function(done) {
console.log("Getting deployed version of SimpleStorage...")

SimpleStorage.deployed().then( function (instance) {
    //For Ethereum is OK but nor Quorum
    //var SimpleStorageEvents = instance.StoreValueUpdate()
    //For Quorum, let use the allEvents with additionalFilterObject?????
    var SimpleStorageEvents = instance.allEvents({from: instance.address})
    console.log("Contract Address: " + instance.address + " waiting for event update....");
    SimpleStorageEvents.watch(function (err, event) {
        if (!err) {
            console.log("Update Recived: " + JSON.stringify(event) + " => storeData: " + event.args.dataUpdate);
        } else {
            console.log("Error! " + err);
        }
    })

    console.log("New Tx, setting new value to 4");
    // Quorum set
    instance.set(4, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}).then(function(tx_id) {
    // Ethereum set
    //instance.set(4).then(function(tx_id) {
        console.log("Transaction  successful!" + " TX: " + tx_id.tx +  " blockNumber: " + tx_id.receipt.blockNumber )
    }).catch(function(e) {
        console.log(e)
    })

}).catch(function(e) {
    console.log(e);
}) 
