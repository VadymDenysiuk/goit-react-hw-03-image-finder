import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadButton from '../Button';
import Modal from '../Modal';
import apiImages from '../../services/api';
import { List } from './ImageGallert.styled';
import { toast } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    query: [],
    page: 1,
    status: 'idle',
    showModal: false,
    modalUrl: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      this.setState({ status: 'pending' });

      apiImages(query, page)
        .then(query => {
          if (!query.hits.length) {
            this.setState({
              status: 'idle',
            });
            toast.error('Данные по Вашему запросу отсутствуют :(');
          } else {
            this.setState({
              status: 'resolved',
              query: query.hits,
            });
          }
        })
        .catch(error => this.setState({ error }));
    }
    if (prevState.page !== page) {
      apiImages(query, page).then(query => {
        this.setState({
          status: 'resolved',
          query: [...prevState.query, ...query.hits],
        });
      });
    }
  }

  incrementPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openModal = url => {
    this.setState(state => ({
      showModal: !state.showModal,
      modalUrl: url,
    }));
  };
  closeModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { status, query, showModal, modalUrl } = this.state;
    if (status === 'idle') {
      return null;
    }

    if (status === 'resolved') {
      return (
        <>
          <List className="gallery">
            {query.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  smallImg={image.webformatURL}
                  onClick={() => this.openModal(image.largeImageURL)}
                />
              );
            })}
          </List>
          <LoadButton onClick={this.incrementPage} />
          {showModal && (
            <Modal onClose={this.closeModal}>
              <img src={modalUrl} alt="" />
            </Modal>
          )}
        </>
      );
    }

    if (status === 'pending') {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={2500} //3 secs
        />
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};

export default ImageGallery;
