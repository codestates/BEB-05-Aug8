// import styled from 'styled-components';
import './ExploreNFT.css'

const NFTItem = ({ article }) => {
  const { id, name, image_url } = article;
  return (
    // <NFTItemBlock>
    <div className='NFTItem-block'>
      {image_url && (
        <div className="thumbnail">
          <a className='aimg' href={image_url} target="_blank" rel="noopener noreferrer">
            <img className='img' src={image_url} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <p className='contents-number'>
          {'#'+id}
        </p>
        <p className='name'>{name}</p>
      </div>
    </div>
    // </NFTItemBlock>
  );
};

export default NFTItem;