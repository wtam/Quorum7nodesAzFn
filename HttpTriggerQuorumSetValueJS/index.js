// use Kudu:
// npm install -g truffle
// npm install -g ethereumjs-testrpc
// npm install truffle-contract
// npm install -g ethereum.js   Note: Don't use web3 or Truffle-Procvider as its has tons of issue during npm install on windows os

// Preparation before running this AzFn for the 1st time!
// Use Kudu: Truffle to deploy the contract:
// cd migrations folder
// truffle migrate
//
// Use Kudu: Run below Txn and check from truffle console for the value
// set request body t0 { "value": "7"} or whatever the number
// cd migrations folder
// truffle consle or --network nodetwo-six, nodeseven to chjeck, only nodeone and nodeseven can see it
// SimpleStorage.deployed().then(function(instance) { return instance.get(); })

const contract = require('truffle-contract');
 
// smart contract artifact
const simpleStorage_json = require('../../../build/contracts/SimpleStorage.json')

// ABI abstraction
const SimpleStorage = contract(simpleStorage_json);

//Set the Web3 HttpProvider in Truffle-Contract
var web3 = require('ethereum.js');
SimpleStorage.setProvider(new web3.providers.HttpProvider('http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000'));

//Set the Acct default address; othjerwise will get Invalid Address Error
var account_one = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"; // node1 acct key. Refer to /quorum-examples/examples/7nodes/keys$
SimpleStorage.defaults({from: account_one});

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //context.log(SimpleStorage);
    if (req.query.value || (req.body && req.body.value)) {
        context.log("Setting value " + req.body.value + " to Azure Quroum7nodes.....")
        set(req.body.value)
        //retrieve the stored value
        context.log("StoredValue : " + get());
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Set Value " + (req.query.value || req.body.value)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    
    function set (storeValue) {
        context.log("Initiating transaction to set value: " + req.body.value + " ,private to Node 1 & 7....");
        SimpleStorage.deployed().then(function(instance) {
            return instance.set(storeValue, {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
        }).catch(function(e) {
            context.log(e);
            context.log("Error setting storage value; see log." + e);
        }); 
    }

    function get () { 
        SimpleStorage.deployed().then(function(instance) {
            return instance.get();            
        }).catch(function(e) {
            context.log("Error getting storage value; see log." + e);
        }); 
    }
    context.done();
};