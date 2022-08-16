import { useState, useEffect } from 'react';
// import styled from 'styled-components';
import NFTItem from '../components/ExploreNFT';
import axios from 'axios';
import './css/Explore.css'

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

const ExploreDB = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    return <div className='NFTList-block'>대기중</div>;
  }
  // 아직 response 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  const filtered = articles.filter( (item) => item.image_url !== null)
  console.log("filtered: ", filtered);

  return (
    // <NFTListBlock>
    <div className='NFTList-block'>
      <h2>Explore Uploaded NFTs</h2>
      {/* <br></br>
      <br></br>
      <br></br> */}
      {filtered.map(article => (
        <NFTItem key={article.imageUrl} article={article} />
      ))}
    </div>
    // </NFTListBlock>
  );
};

export default ExploreDB;