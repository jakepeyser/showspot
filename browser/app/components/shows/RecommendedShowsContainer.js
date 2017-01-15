import React from 'react';
import { connect } from 'react-redux';
import RecommendedShows from './RecommendedShows';
import axios from 'axios';

class RecommendedShowsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedShows: [],
      location: '',
      error: null
    }
    this.updateLocation = this.updateLocation.bind(this);
    this.getRecommendedShows = this.getRecommendedShows.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("Latitude: " + pos.coords.latitude + " Longitude: " + pos.coords.longitude );
        this.setState({ location: 'New York, NY' });
        this.getRecommendedShows();
      });
    } else {
      this.setState({ location: 'New York, NY' });
      this.getRecommendedShows();
    }
  }

  updateLocation(loc) {
    this.setState({ location: loc });
  }

  getRecommendedShows() {
    const { artist } = this.props;
    console.log(this.state.location)
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
      <RecommendedShows Shows
        recommendedShows={ this.state.recommendedShows }
        location={ this.state.location }
        locationChange={ this.updateLocation }
        searchLocation={ this.getRecommendedShows }
        error={ this.state.error }
      />
    )
  }
}

const mapStateToProps = ({ artist }) => ({ artist })

export default connect(mapStateToProps)(RecommendedShowsContainer);
