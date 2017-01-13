import React from 'react';
import { connect } from 'react-redux'
import Artist from './Artist';
import axios from 'axios';

class ArtistContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedShows: [],
      error: null
    }
  }

  componentDidMount() {
    const { artist } = this.props;
    axios.get(`api/artist/${artist.id}/recommended-shows`)
      .then(res => {
        this.setState({
          recommendedShows: res.data,
          error: null
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: 'Unable to retrieve recommended shows at this time' })
      })
  }

  render() {
    return (
      <Artist
        artist={ this.props.artist }
        recommendedShows={ this.state.recommendedShows }
        error={ this.state.error }
      />
    )
  }
}

const mapStateToProps = ({ artist }) => ({ artist })

export default connect(mapStateToProps)(ArtistContainer);
