import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  render() {
    const { smallImg, onClick } = this.props;
    return (
      <Item>
        <Image src={smallImg} onClick={onClick} alt="" />
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
