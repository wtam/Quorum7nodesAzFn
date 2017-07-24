//  Get method only
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

var storedValue = null;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    //context.log(SimpleStorage);   
    context.log("Getting stored value from Azure Quroum7nodes....")
    get();
    

    function get () { 
        SimpleStorage.deployed().then(function(instance) {
            return instance.get().then(function(returnValue) {
                context.log(returnValue);
                this.storedValue = returnValue;
                context.res = {
                    // status: 200, /* Defaults to 200  if success*/ 
                    body: "Stored Value(Quorum7nodes): " + this.storedValue
                }
                context.done();
            })
        }).catch(function(e) {
            context.log("Error getting storage value; see log." + e);
        }); 
    }
    //context.done();
};