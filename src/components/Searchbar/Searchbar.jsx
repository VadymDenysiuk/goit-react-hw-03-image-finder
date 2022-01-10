import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleQuerySearch = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Введите что-то');
      return;
    }
    onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label className="button-label">Search</Label>
          </Button>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleQuerySearch}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
