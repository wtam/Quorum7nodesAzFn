// C:\Github-MyWork\Quorum7nodesAzFn$npm install node-gyp --save
// C:\Github-MyWork\Quorum7nodesAzFn$git clone https://github.com/cheongwy/node-scrypt.git 
// scrypt@6.0.1 preinstall C:\Github-MyWork\Quorum7nodesAzFn\node-scrypt
// npm install --production windows-build-tools  --save  [run PowerShell as adminstrator!]
// C:\Github-MyWork\Quorum7nodesAzFn$node-gyp --python /path/to/python2.7
// C:\Github-MyWork\Quorum7nodesAzFn$ npm config set python /path/to/executable/python2.7
// create the binding.gyp in C:\Github-MyWork\Quorum7nodesAzFn
// C:\Github-MyWork\Quorum7nodesAzFn$ node-gyp configure --msvs_version=2015 --python=v2.7.0
// C:\Github-MyWork\Quorum7nodesAzFn$ set PATH=$PATH:/C:/Program Files \(x86\)/MSBuild/14.0/Bin
// C:\Github-MyWork\Quorum7nodesAzFn$ set GYP_MSVS_VERSION=2015
// C:\Github-MyWork\Quorum7nodesAzFn$ npm install --msvs_version=2015
// C:\Github-MyWork\Quorum7nodesAzFn$ node-gyp rebuild --python=v2.7.0
// Even though the node-gyp rebuild fail below message, I'm still able to get web3 instal lwiht node-gyp rebuild
/*Have to got this resolve for node-gyp rebuild 
c1xx : fatal error C1083: Cannot open source file: '..\src\binding.cc': No such file or di
rectory [C:\Github-MyWork\Quorum7nodesAzFn\build\binding.vcxproj]
*/
// C:\Github-MyWork\Quorum7nodesAzFn$ npm web3 install --save

var Web3 = require('web3');
var web3 = new Web3()
//web3.setProvider(new web3.providers.HttpProvider('http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000', 0, BasicAuthUsername, BasicAuthPassword));
web3.setProvider(new web3.providers.HttpProvider('http://quorumdemo7nodes.eastasia.cloudapp.azure.com:22000'));
///console.log(web3.eth)
var coinbase = web3.eth.coinbase;

try {
   /*
   var tx = web3.eth.getTransaction('0x4095ec6359c7298447317aa4c05f08a3bc34345be9ecdd342439f487a1251453').then( function (TX) {
        console.log("TX: ", TX);
   }) */
   // Replace the transactionHash to below line to check if it is mined:)
   var txR = web3.eth.getTransactionReceipt('0xd512875a291793c7682f4d65a8e4c2c4b4f1b6b6c886b839b12f1e2d8018c53e').then( function (TXR) {
        console.log("TXR: ", TXR);
        if (TXR.blockNumber == undefined)
            throw "transaction receipt not found, Not yet mined!";
        else 
            console.log("Transaction Mined with BlockNumber: " + TXR.blockNumber );
   }) 
 } catch(e) {
       console.log("invalid tx receipt: " + e);
}
