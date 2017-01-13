import React from 'react';
import { connect } from 'react-redux'
import Artist from './Artist';
import axios from 'axios';

class ArtistContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Artist
        artist={ this.props.artist }
      />
    )
  }
}

const mapStateToProps = ({ artist }) => ({ artist })

export default connect(mapStateToProps)(ArtistContainer);
