import React, {useState, useEffect} from 'react';
import { Alert, Badge, Button, Card, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

let Web3 = require('web3');
var numeral = require('numeral');

function Index() {

  const [framework, setFramework] = useState('truffle');
  const [hardhatResult, SethardhatResult] = useState('');
  const [messageToContract, SetMessageToContract] = useState('');

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [ethBalance, setethBalance] = useState(0);
  const [otherBalance, setotherBalance] = useState(0);
  const [networkSelect, setNetwork] = useState(null);

  const [receiverAddress, setReceiverAddress] = useState(null);
  const [transferAmount, setTransferAmount] = useState(0);

  const dev_contractAddress = framework == 'truffle' ? "" : "";
  const dev_web3Connect = "";
  
  let testLocal = false;

  let contractAddress = testLocal ? "" : dev_contractAddress;
  let web3Connect = testLocal ? "" : dev_web3Connect;

  var contractJson = require('../simple_contract/build/contracts/Tent_Token.json');
  var contractJsonHardhat = require('../hardhat_simple_contract/artifacts/contracts/Greeter.sol/Greeter.json');

  let abi = testLocal && framework == 'truffle' ? contractJson['abi']
   : testLocal && framework == 'hardhat' ? contractJsonHardhat['abi']
   : !testLocal && framework == 'truffle' ? [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountOfETH",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountOfTokens",
          "type": "uint256"
        }
      ],
      "name": "BuyTokens",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "fromDelegate",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "toDelegate",
          "type": "address"
        }
      ],
      "name": "DelegateChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegate",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "previousBalance",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newBalance",
          "type": "uint256"
        }
      ],
      "name": "DelegateVotesChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountOfTokens",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountOfETH",
          "type": "uint256"
        }
      ],
      "name": "SellTokens",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "pos",
          "type": "uint32"
        }
      ],
      "name": "checkpoints",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint32",
              "name": "fromBlock",
              "type": "uint32"
            },
            {
              "internalType": "uint224",
              "name": "votes",
              "type": "uint224"
            }
          ],
          "internalType": "struct ERC20Votes.Checkpoint",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "delegatee",
          "type": "address"
        }
      ],
      "name": "delegate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "delegatee",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "delegateBySig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "delegates",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "getPastTotalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "getPastVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "numCheckpoints",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "tokensPerEth",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "buyTokens",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "holder",
          "type": "address"
        }
      ],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ] : contractJsonHardhat['abi'];// Paste your ABI here

  async function setContractInit() {
    try{
      window.ethereum ?
        ethereum.request({ method: "eth_requestAccounts" }).then(async (accounts) => {

          if(testLocal){
            accounts[0] = test_WalletAddress;
          }

          console.log('getAccount:', accounts);
          
          setOWnerAddress(accounts);
          
          let w3 = await new Web3(web3Connect);
          
          setWeb3(w3);

          let c = new w3.eth.Contract(abi, contractAddress);

          console.log('Contract: ', c._address);
          setContract(c);

          startApp(w3, accounts, c);

        }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
    }catch(error){
      console.log('START ERROR: ' + error);
    }

    ethereum.on('accountsChanged', (accounts) => {
      console.log('Account Changed');
      window.location.reload();
    });
  };

  useEffect(async () => {
    console.log('==========FIRST APP RUN==========');
    await setContractInit()
  }, []);

  useEffect(async () => {
    console.log('Change framework to : '+framework);
    await setContractInit();
    setethBalance(Number(0).toFixed(4));
    setotherBalance(Number(0).toFixed(4));
    SethardhatResult('');
  },[framework]);

  function setOWnerAddress(accounts) {
    console.log('Call setOWnerAddress');
    setAddress(accounts[0]);
  }

  // Get current network
  function startApp(web3, accounts, c) {
    console.log('Start App');
    console.log('Data: ', web3, accounts[0], c);


    try{
      web3.eth.getBalance(accounts[0]).then( (balances) => {
        let bn = web3.utils.fromWei(balances, "ether");
        console.log('getBalance: ', bn);
        setethBalance(Number(bn).toFixed(4));
      });

      c.methods.balanceOf(accounts[0]).call({from: accounts[0]}, function(error, result){

        if(error){
          console.log(error);
        }else{
          let bn = web3.utils.fromWei(result, "ether");
          console.log('getBalance: ' + bn + ' TENT');
          setotherBalance(Number(bn).toFixed(4));
        }
        
      });

      web3.eth.net.getId().then(netId => {

        let network = '';
        let networkDisplay = '';
        let warning = '';
        let explorerUrl = '';

        console.log('netId: ' + netId);

        switch (netId) {
          case 1:
              network = 'Mainnet';
              networkDisplay = network;
              warning = 'please switch your network to Kovan or Thai Chain';
              explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
              break
          case 2:
              network = 'Deprecated Morden';
              networkDisplay = network;
              warning = 'please switch your network to Kovan or Thai Chain';
              explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
              break
          case 3:
              network = 'Ropsten';
              networkDisplay = network;
              warning = 'please switch your network to Kovan or Thai Chain';
              explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
              break
          case 4:
              network = 'Rinkeby';
              networkDisplay = network;
              contractAddress = '0x6075b70b4f94af25e047fac6a538ea06a5206bca';
              explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
              break
          case 7:
              network = 'Thai Chain';
              networkDisplay = network;
              contractAddress = '0x0898424ddf8f9478aad9f2280a6480f1858ad1c6';
              explorerUrl = "https://exp.tch.in.th/tx/"
              break
          case 42:
              network = 'Kovan';
              networkDisplay = network;
              explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/tx/"
              break
          case 1337:
              network = 'Kovan - Optimism';
              networkDisplay = '<strong>Kovan Optimism</strong><br/>(Level 2 Ethereum)';
              contractAddress = '0xE6dCD042c4dDaC0f390A7B1CB8B4D60DD20b6338';
              explorerUrl = "https://kovan-l2-explorer.surge.sh/tx/";
              break
          case 5777:
              network = 'Ganache';
              networkDisplay = network;
              break
          case KULAPBesuNetworkId:
              network = 'KULAP Besu'
              networkDisplay = '<strong>KULAP Besu</strong><br/>(Enterprise Blockchain)';
              contractAddress = '0x5924aC8829CE51674415Ae619C796C12815010eF';
              explorerUrl = "http://besu1.kulap.io/tx/";
              break
          default:
              network = 'Unknown';
              networkDisplay = network;
              warning = 'please switch your network to Kovan or Thai Chain';
        }
        setNetwork(networkDisplay);
        console.log('Network: ', networkDisplay);
      })
    }catch(error){
        console.log('START ERROR : '+error);
    }
  }

  //Workshop: 8) Write transfer function here
  async function transferHardhat() {
    try{
      let convertUintTransferAmount = web3.utils.toWei(transferAmount, "ether");

      console.log('My address: ', address);
      console.log('Transfer to: ', receiverAddress);
      console.log('Amount: ', convertUintTransferAmount);

      const transactionParameters = {
        from: address,
        to: contractAddress,
        data: contract.methods.transfer(receiverAddress, convertUintTransferAmount).encodeABI()
      };

      await window.ethereum.request({method: 'eth_sendTransaction', params: [transactionParameters]}).then((result) => {
        console.log('Sending transaction...');
        console.log(result);
      }).catch((error) => {
        console.log('Sending transaction error');
        console.log(error);
      })
    }
    catch(err){
      console.log(err.message);
      swal ( "Oops" ,  err.message,  "error" )
    }
  }
  //----- End of Workshop: 8) Write transfer function here -----

  async function transfer() {

    try{
      let convertUintTransferAmount = web3.utils.toWei(transferAmount, "ether");

      console.log('My address: ', address);
      console.log('Transfer to: ', receiverAddress);
      console.log('Amount: ', convertUintTransferAmount);

      const transactionParameters = {
        from: address,
        to: contractAddress,
        data: contract.methods.transfer(receiverAddress, convertUintTransferAmount).encodeABI()
      };

      console.log('transactionParameters: ', transactionParameters);

      if(testLocal){
          contract.methods.transfer(receiverAddress, convertUintTransferAmount).send({from: address}, function(error, result){
            console.log('Transfer: ', result);
          });
      }else{
        const txHash =  await window.ethereum.request({method: 'eth_sendTransaction', params: [transactionParameters]}).then((result) => {
          console.log('Sending transaction...');
          console.log(result);
        }).catch((error) => {
          console.log('Sending transaction error');
          console.log(error);
        })
      }
    }
    catch(err){
      console.log(err.message);
      swal ( "Oops" ,  err.message,  "error" )
    }
    
  }

  async function greetMe() {
    console.log(contract);
    const greetMsg = await contract.methods.greet().call();
    SethardhatResult(greetMsg);
  }

  async function setGreetMe() {

    const transactionParameters = {
      from: address,
      to: contractAddress,
      data: contract.methods.setGreeting(messageToContract).encodeABI()
    };

    const txHash =  await window.ethereum.request({method: 'eth_sendTransaction', params: [transactionParameters]}).then((result) => {
      console.log('Sending transaction...');
      console.log(result);
    }).catch((error) => {
      console.log('Sending transaction error');
      console.log(error);
    })

    // await contract.methods.setGreeting(messageToContract).send({ from: address });
    // setGreetings(await greetMe())
  }

  function setFrameworkFn(select_framwork) {
    setFramework(select_framwork);
  }

  function receiverAddressChange (input) {
    setReceiverAddress(input.target.value);
  }

  function transferAmountChange (input) {
    setTransferAmount(input.target.value);
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">Tent Token</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent: 'right'}}>
        <Nav>
          <Nav.Link>{address ? address : <div onClick={setContractInit}>Connect Wallet</div>}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <Alert variant='success'>
        <Row>
          <Col>
            <b>Contract address :</b> {contract ? contract['_address'] : 'Not Connect' }
          </Col>
        </Row>
        </Alert>
        <Row>
          <Col>
            <Card >
              <div>
                <div>
                  <b>dApps Network :</b> {networkSelect ? networkSelect : 'Not Connect' }
                </div>
                <div>
                  <b>ETH Balance :</b> { ethBalance ? numeral(ethBalance).format('0,0.0000') : '0' } ETH
                </div>
                <div>
                  <b>Token Balance :</b> { otherBalance ? numeral(otherBalance).format('0,0.0000') : '0' } TENT
                </div>
              </div>
              <div>
                <div>
                  <b>Framework :</b>
                    <Button
                      variant= {framework == 'truffle' ? 'success' : 'secondary'}
                      size='sm'
                      disabled={framework == 'truffle' ? true : false}
                      onClick={() => setFrameworkFn('truffle')}
                    >
                    Truffle
                    </Button>
                    <Button
                      variant= {framework == 'hardhat' ? 'success' : 'secondary'}
                      size='sm'
                      disabled={framework == 'hardhat' ? true : false}
                      onClick={() => setFrameworkFn('hardhat')}
                    >
                    Hardhat
                    </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col>
          {framework == 'truffle' ?
            <Card>
            <Row className="justify-content-md-center">
              <Col md="auto" style={{textAlign: 'left'}}>
                <div style={{marginTop: 20}}>
                  <b>Send to :</b> <input placeholder='Ethereum Address' value={receiverAddress} onChange={receiverAddressChange}></input>
                </div>
                <div style={{marginTop: 20}}>
                  <b>Amount :</b> <input placeholder='Amount' value={transferAmount} onChange={transferAmountChange}></input> TENT
                </div>
              </Col>
            </Row>
              <div style={{marginTop: 10, marginBottom: 20}}>
                <Button onClick={transfer}>Send</Button>
              </div>
            </Card>
          :
          <>
            <Card>
            <Row className="justify-content-md-center">
              <Col md="auto" style={{textAlign: 'left'}}>
                <div style={{marginTop: 20}}>
                  <b>Message :</b> {hardhatResult}
                </div>
              </Col>
            </Row>
              <div style={{marginTop: 10, marginBottom: 20}}>
                <Button onClick={greetMe}>Greet Me!</Button>
              </div>
            </Card>
            <Card style={{marginTop: 20}}>
              <Row className="justify-content-md-center">
                <Col md="auto" style={{textAlign: 'left'}}>
                  <div style={{marginTop: 20}}>
                    <b>Set Message :</b> <input placeholder='Message' value={messageToContract} onChange={e => SetMessageToContract(e.target.value)}></input>
                  </div>
                </Col>
              </Row>
              <div style={{marginTop: 10, marginBottom: 20}}>
                <Button onClick={setGreetMe}>Set Me!</Button>
              </div>
            </Card>
            <Card style={{marginTop: 20}}>
            <Row className="justify-content-md-center">
              <Col md="auto" style={{textAlign: 'left'}}>
                <div style={{marginTop: 20}}>
                  <b>Send to :</b> <input placeholder='Ethereum Address' value={receiverAddress} onChange={receiverAddressChange}></input>
                </div>
                <div style={{marginTop: 20}}>
                  <b>Amount :</b> <input placeholder='Amount' value={transferAmount} onChange={transferAmountChange}></input> HHT
                </div>
              </Col>
            </Row>
              <div style={{marginTop: 10, marginBottom: 20}}>
                <Button onClick={transferHardhat}>Send</Button>
              </div>
            </Card>
          </>
          }
          </Col>
        </Row>
         
      </div>
    </Container>
    </>
    
  )
}

export default Index;