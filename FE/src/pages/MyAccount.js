import './css/MyCollections.css';
import {useEffect, useState} from 'react';
import Web3 from 'web3';
import erc721Abi from '../erc721Abi';
import TokenList from '../components/TokenList';
// import { ethers } from "ethers"

// contract address
// 0xEef7C01b329BcEc42CfFA7fF1F318f47c16c0f7E

// nft marketplace
// 0xeB3D35b0c4E1dD17Db2AE3472D16224CB843f37C

// to 
// 0x9930509D991987dE10C6708c1Cab2e9EE9dA599D
function MyAccount() {

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('연결 안 됨');
  const [balance, setBalance] = useState(0);
  const rpcURL = "https://ropsten.infura.io/v3/8bcf24fad93341fd9e58dde29957446c";

  useEffect(() => {
    if(typeof window.ethereum !== "undefined"){ // if window.ethereum 이 있다면
      try{
        const web = new Web3(window.ethereum); // new web3 object
        setWeb3(web);

        // // Get provider from Metamask - why is it needed?
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // // Set signer - what is the signer????
        // const signer = provider.getSigner()
        // loadMarketContracts(singer)


      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts", // connect to metamask wallet
    });

    setAccount(accounts[0]);
    web3.eth.getBalance(accounts[0]).then((bal)=>{
      setBalance(parseFloat(web3.utils.fromWei(bal,'ether')).toFixed(5))
    })
  }

  return (
    <div className="App">
      <br></br>
      <button 
        className="metaConnect"
        onClick={() => {
          connectWallet();
        }}
      >
        Check My Account Info
      </button>
      <div className='userInfo'>addr: {account}</div>
      <div className='balance'>balance : {balance} ETH</div>
    </div>
  );
}

export default MyAccount; 