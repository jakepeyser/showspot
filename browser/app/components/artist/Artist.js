import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import RecommendedShows from '../shows/RecommendedShowsContainer';
import { placeCommas } from '../utils';

const Artist = ({ artist, error }) => {
  if (!Object.keys(artist).length) return null;

  // Grab artist picture
  const imageURL = artist.images.length ?
    artist.images[0].url : 'https://byteturtle.eu/player/assets/img/default.png';

  return (
    <div id="artist">
      <Helmet title={ artist.name } />
      <div className="artist-data">
        <div className="artist-image">
          <img
            src={ imageURL }
            alt={ artist.name } />
        </div>
        <div className="artist-metadata">
          <div className="artist-header">
            <h2>{ artist.name }</h2>
            <a href={ artist.external_urls.spotify } target="_blank">
              <div className="spotify-play"/>
            </a>
          </div>
          <p className="artist-followers">
            { `${placeCommas(artist.followers.total)} followers` }
          </p>
          <div className="artist-genres">
            { // Display the first five genres
              artist.genres.map(genre => <p key={ genre }>{ genre }</p>)
            }
          </div>
        </div>
      </div>
      <RecommendedShows />
    </div>
  )
};

const mapStateToProps = ({ artist }) => ({ artist })

export default connect(mapStateToProps)(Artist);
