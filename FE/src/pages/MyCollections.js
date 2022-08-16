import { useState, useEffect } from 'react';
// import styled from 'styled-components';
import NFTItem from '../components/ExploreNFT';
import axios from 'axios';
import './css/Explore.css'
import Web3 from 'web3';

// contract address
// 0xEef7C01b329BcEc42CfFA7fF1F318f47c16c0f7E

function MyCollections() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState('연결 안 됨');

  useEffect(() => {
    if(typeof window.ethereum !== "undefined"){
      try{
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://ec2-43-200-175-29.ap-northeast-2.compute.amazonaws.com/nft-metadata',
        );
        console.log(response.data);
        setArticles(response.data);
      } catch (e){
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 대기중일 때
  if (loading) {
    // return <NFTListBlock>대기중...</NFTListBlock>;
    return <div className='NFTList-block'>로딩중</div>;
  }
  // 아직 response 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }


  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts", // connect to metamask wallet
    });

    setAccount(accounts[0]);
  }
  connectWallet();
  console.log(account);

  // owner로 가지고 있는 것만 띄워주기
  const filtered = articles.filter( (item) => item.ownerAccount.toLowerCase() === account);
  console.log("filtered: ", filtered);

  return (
    // <NFTListBlock>
    <div className='NFTList-block'>
      <h2>My Collections</h2>
      <p className='account'>
        {"Account: " + account}
      </p>
      <br></br>
      {filtered.map(article => (
        <NFTItem key={article.imageUrl} article={article} />
      ))}
    </div>
    // </NFTListBlock>
  );
};

export default MyCollections; 