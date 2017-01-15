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
      loading: true,
      error: ''
    }
    this.updateLocation = this.updateLocation.bind(this);
    this.getRecommendedShows = this.getRecommendedShows.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) { // Check if browser supports geolocation
      // Get the user's current lat/lon
      navigator.geolocation.getCurrentPosition((pos) => {
        // Retrieve the city/state of the user based on their lat/lon
        axios.get(`api/location/reverse-geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
          .then(({ data }) => {
            this.setState({ location: `${data.city}, ${data.state}` });
            this.getRecommendedShows();
          })
          .catch(err => {
            console.error(err);
            this.setState({ loading: false });
          })
      }, (err) => { // Geolocation was blocked
        console.error(err);
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  updateLocation(loc) {
    this.setState({ location: loc });
  }

  // Retrieve recommended shows based on the current artist and state.location
  getRecommendedShows() {
    const { artist } = this.props;
    this.setState({ loading: true });
    axios.get(`api/artist/${artist.id}/recommended-shows?location=${this.state.location}`)
      .then(res => {
        this.setState({
          recommendedShows: res.data,
          loading: false,
          error: ''
        })
      })
      .catch(err => {
        console.error(err);
        // Parse and display relevant error message based on the response
        let errMsg = `Unable to retrieve recommended shows at this time
                      ${err.response.status === 400 ? ` - ${err.response.data}` : ''}`
        this.setState({
          recommendedShows: [],
          error: errMsg,
          loading: false
        })
      })
  }

  render() {
    return (
      <RecommendedShows Shows
        recommendedShows={ this.state.recommendedShows }
        location={ this.state.location }
        locationChange={ this.updateLocation }
        searchLocation={ this.getRecommendedShows }
        loading={ this.state.loading }
        error={ this.state.error }
      />
    )
  }
}

const mapStateToProps = ({ artist }) => ({ artist })

export default connect(mapStateToProps)(RecommendedShowsContainer);
