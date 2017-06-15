import React from'react';
import { connect } from 'react-redux';
import Search from './Search';
import axios from 'axios';

const initialState = {
  artists: [],
  error: null
};

class SearchContainer extends React.Component {
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
    axios.get(
      `https://api.spotify.com/v1/search?type=artist&q=${text}`,
      { headers: {'Authorization': `Bearer ${this.props.token}`} }
    )
      .then(res => {
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

const mapStateToProps = ({ token }) => ({ token })

export default connect(mapStateToProps)(SearchContainer);
