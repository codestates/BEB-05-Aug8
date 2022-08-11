import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import erc721Abi from './erc721Abi';
import TokenList from './components/TokenList';
import Header from './components/Header';
import Explore from './pages/Explore';
import Create from './pages/Create';
import MyCollections from './pages/MyCollections';

// contract address
// 0xEef7C01b329BcEc42CfFA7fF1F318f47c16c0f7E
function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('연결 안 됨');
  const [newErc721addr, setNewErc721Addr] = useState();
  const [erc721list, setErc721list] = useState([]);
 
  useEffect(() => {
    if(typeof window.ethereum !== "undefined"){
      try{
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  }

  const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract(
      erc721Abi,
      newErc721addr
    );
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
          return [...prevState, {name, symbol, tokenId, tokenURI}];
        })
      }
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Explore />}></Route>
          <Route path='/create/*' element={<Create />}></Route>
          <Route path='/my-collections/*' element={<MyCollections />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;