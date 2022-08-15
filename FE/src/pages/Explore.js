import { useState, useEffect } from 'react';
// import styled from 'styled-components';
import NFTItem from '../components/ExploreNFT';
import axios from 'axios';
import './Explore.css'

// const NFTListBlock = styled.div`
//   box-sizing: border-box;
//   padding-bottom: 3rem;
//   width: 768px;
//   margin: 0 auto;
//   margin-top: 2rem;
//   @media screen and (max-width: 768px) {
//     width: 100%;
//     padding-left: 1rem;
//     padding-right: 1rem;
//   }
// `;

const NFTList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=100&include_orders=false',
        );
        setArticles(response.data.assets);
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
    return <div className='NFTList-block'>대기중</div>;
  }
  // 아직 response 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  const filtered = articles.filter( (item) => item.image_url !== null)

  return (
    // <NFTListBlock>
    <div className='NFTList-block'>
      <h1>Discover, collect, and sell extraordinary NFTs</h1>
      {/* <br></br>
      <br></br>
      <br></br> */}
      {filtered.map(article => (
        <NFTItem key={article.url} article={article} />
      ))}
    </div>
    // </NFTListBlock>
  );
};

export default NFTList;