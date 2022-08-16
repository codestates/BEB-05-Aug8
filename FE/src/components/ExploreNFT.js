// import styled from 'styled-components';
import './ExploreNFT.css'

// const NFTItemBlock = styled.div`
//   display: flex;
//   .thumbnail {
//     margin-right: 1rem;
//     img {
//       display: block;
//       width: 200px;
//       height: 200px;
//       object-fit: cover;
//     }
//   }
//   .contents {
//     h2 {
//       margin: 0;
//       a {
//         color: black;
//       }
//     }
//     p {
//       margin: 0;
//       line-height: 1.5;
//       margin-top: 0.5rem;
//       white-space: normal;
//     }
//   }
//   & + & {
//     margin-top: 3rem;
//   }
// `;

const NFTItem = ({ article }) => {
  const { tokenId, name, imageUrl } = article;
  return (
    // <NFTItemBlock>
    <div className='NFTItem-block'>
      {imageUrl && (
        <div className="thumbnail">
          <a className='aimg' href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img className='img' src={imageUrl} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <p className='contents-number'>
          {'#'+tokenId}
        </p>
        <p className='name'>{name}</p>
      </div>
    </div>
    // </NFTItemBlock>
  );
};

export default NFTItem;