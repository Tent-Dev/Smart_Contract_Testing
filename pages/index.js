import React, {useState, useEffect} from 'react';
import { Alert, Button, Card, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let Web3 = require('web3');
var numeral = require('numeral');

function Index() {

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [ethBalance, setethBalance] = useState(0);
  const [otherBalance, setotherBalance] = useState(0);
  const [networkSelect, setNetwork] = useState(null);

  let abi = [
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "name": "getVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "type": "function"
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
      "name": "numCheckpoints",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
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
      "type": "function"
    }
  ] // Paste your ABI here

  let testLocal = true;
  let contractAddress = testLocal ? "0xbE10b68e255068359Ebb272D3564723eF0C496DD" : "0xc472d90ccb58c1df3d6d290e8814232ccf06ef95";
  let web3Connect = testLocal ? 'http://localhost:7545' : 'wss://ropsten.infura.io/ws/v3/6a33721938864557ad8f30daac2ccf63'

  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then(async (accounts) => {

        if(testLocal){
          accounts[0] = '0xC2fe8d3fD9a6C6A1b7D6D2986fCAe2D5b861A667';
        }

        console.log('getAccount:', accounts);
        
        setOWnerAddress(accounts);
        
        // let w3 = await new Web3('wss://ropsten.infura.io/ws/v3/6a33721938864557ad8f30daac2ccf63');

        let w3 = await new Web3(web3Connect);
        
        setWeb3(w3);

        let c = new w3.eth.Contract(abi, contractAddress);

        console.log('Contract: ', c._address);
        setContract(c._address);

        startApp(w3, accounts, c);

      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask")
  }, [])

    function setOWnerAddress(accounts) {
      console.log('Call setOWnerAddress');
      setAddress(accounts[0], result =>{
        console.log('Change Owner address');
      });
    }

    // Get current network
    function startApp(web3, accounts, c) {
      console.log('Start App');
      console.log('Data: ', web3, accounts[0], c);


  
      web3.eth.getBalance(accounts[0]).then( (balances) => {
        let bn = web3.utils.fromWei(balances, "ether");
        console.log('getBalance: ', bn);
        setethBalance(Number(bn).toFixed(4));
      });

      c.methods.getBalance(contractAddress,accounts[0]).call({from: accounts[0]}, function(error, result){

        if(error){
          console.log(error);
        }else{
          let bn = web3.utils.fromWei(result, "ether");
          console.log('getBalance: ', bn);
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
    }


  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">Tent Token</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent: 'right'}}>
        {/* <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
        <Nav>
          <Nav.Link href="#deets">{address ? address : 'Not Connect'}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <Alert variant='success'>
        <Row>
          <Col>
            <b>Contract address :</b> {contract ? contract : 'Not Connect' }
          </Col>
        </Row>  
        <Row>
          <Col>
            <b>Don't have Tent Token ? </b> <Button variant='success' size='sm'>Buy now</Button>
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
            </Card>
          </Col>
          <Col>
            <Card >
            <Row className="justify-content-md-center">
              <Col md="auto" style={{textAlign: 'left'}}>
                <div style={{marginTop: 20}}>
                  <b>Send to :</b> <input placeholder='Ethereum Address'></input>
                </div>
                <div style={{marginTop: 20}}>
                  <b>Amount :</b> <input placeholder='Amount'></input> TENT
                </div>
              </Col>
            </Row>
              <div style={{marginTop: 10, marginBottom: 20}}>
                <Button>Send</Button>
              </div>
            </Card>
          </Col>
        </Row>
         
      </div>
    </Container>
    </>
    
  )
}

export default Index