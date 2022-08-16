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
function MyCollections() {

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('연결 안 됨');
  const [accountBuyer, setAccountBuyer] = useState('연결 안 됨');
  const [balance, setBalance] = useState(0);
  const [balanceBuyer, setBalanceBuyer] = useState(0);
  const [newErc721addr, setNewErc721Addr] = useState();
  const [erc721list, setErc721list] = useState([]);
  const [newErc20addr, setNewErc20Addr] = useState();
  const [erc20list, setErc20list] = useState([]);
  const rpcURL = "https://ropsten.infura.io/v3/8bcf24fad93341fd9e58dde29957446c";
  const [marketplace, setMarketplace] = useState({})


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
  const loadMarketContracts = async (signer) =>{
    // const marketplace = new ethers.Contract(erc721Abi, marketplaceContracts, signer)
    
  }

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts", // connect to metamask wallet
    });

    setAccount(accounts[0]);
    web3.eth.getBalance(accounts[0]).then((bal)=>{
      setBalance(parseFloat(web3.utils.fromWei(bal,'ether')).toFixed(5))
    })
  }



// metamask 연결 → address → ropsten 이더 잔액 확인하는 web3.js call()
  const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract( // define contract object
      erc721Abi,
      newErc721addr
    );

    // 새롭게 민팅된 721이 있으면 그것에 맞는 abi(고정 - 같은 token 안 이므로), addr이 업데이트 되어야함.
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    let arr = [];
    for(let i=1; i <= totalSupply; i++){
      arr.push(i);
    }

    for(let tokenId of arr){
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();

      if(String(tokenOwner).toLowerCase() === account){
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setErc721list((prevState) => {
          return [...prevState, {name, symbol, tokenId, tokenURI, "address":newErc721addr}];
        })
      }
    }
  }

  const buyErc721Token = async () =>{
    
    // nft.transferFrom(msg.sender, newErc721addr, _tokenId);
    // await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()

  }



  return (
    <div className="App">
      
      <button 
        className="metaConnect"
        onClick={() => {
          connectWallet();
        }}
      >
        connect to MetaMask
      </button>
      <div className='userInfo'>addr: {account}</div>
      <div className='balance'>balance : {balance} ETH</div>

      <div className='newErc721'>
        <input
          type="text"
          onChange={(e) => {
            setNewErc721Addr(e.target.value); // 입력 받을 때 마다 newErc721addr 갱신
          }}
        ></input>
        <button onClick={addNewErc721Token}>add new erc721</button>
        {/* <button onClick={sellErc721Token}>sell last erc721</button> */}
      </div>

      <TokenList web3={web3} account={account} erc721list={erc721list}></TokenList>
    </div>
  );
}

export default MyCollections; 