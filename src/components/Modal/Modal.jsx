import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Modal;
