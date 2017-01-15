import React from 'react';
import { connect } from 'react-redux';
import RecommendedShows from './RecommendedShows';
import axios from 'axios';

class RecommendedShowsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedShows: [],
      location: 'New York, NY',
      loading: true,
      error: null
    }
    this.updateLocation = this.updateLocation.bind(this);
    this.getRecommendedShows = this.getRecommendedShows.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        axios.get(`api/location/reverse-geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
          .then(({ data }) => {
            this.setState({ location: `${data.city}, ${data.state}` });
            this.getRecommendedShows();
          })
          .catch(err => {
            console.error(err);
            this.getRecommendedShows();
          })
      });
    } else {
      this.getRecommendedShows();
    }
  }

  updateLocation(loc) {
    this.setState({ location: loc });
  }

  getRecommendedShows() {
    const { artist } = this.props;
    this.setState({ loading: true });
    axios.get(`api/artist/${artist.id}/recommended-shows?location=${this.state.location}`)
      .then(res => {
        this.setState({
          recommendedShows: res.data,
          loading: false,
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
        loading={ this.state.loading }
        error={ this.state.error }
      />
    )
  }
}

const mapStateToProps = ({ artist }) => ({ artist })

export default connect(mapStateToProps)(RecommendedShowsContainer);
