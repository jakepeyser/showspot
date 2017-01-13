import React from'react';
import Search from './Search';
import axios from 'axios';

const initialState = {
  artists: [],
  error: null
};

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(text) {
    // Reset state if nothing in search field
    if (!text) {
      this.setState(initialState);
      return;
    }
    
    // Retrieve the new set of results based on the updated search value
    axios.get(`https://api.spotify.com/v1/search?type=artist&q=${text}`)
      .then(res => {
        console.log(res);
        this.setState({
          artists: res.data.artists.items,
          error: null
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: 'There was an issue searching for artists'});
      })
  }

  render() {
    return (
      <Search
        artists={ this.state.artists }
        error={ this.state.error }
        updateSearch={this.updateSearch}
      />
    )
  }
}
