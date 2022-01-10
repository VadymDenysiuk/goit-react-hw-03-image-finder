import './App.css';
import { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import { Container } from './App.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    status: 'Idle',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
      </Container>
    );
  }
}

export default App;
