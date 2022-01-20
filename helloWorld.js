const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var ethers = require('ethers');  
var url = 'https://ropsten.infura.io/v3/6a33721938864557ad8f30daac2ccf63';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
});

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
