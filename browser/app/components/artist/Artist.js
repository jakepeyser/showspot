import React from 'react';
import Helmet from 'react-helmet';
import { placeCommas, parseDate } from '../utils';

export default ({ artist, recommendedShows, error }) => {
  if (!Object.keys(artist).length) return null;

  // Grab artist picture
  const imageURL = artist.images.length ?
    artist.images[0].url : 'https://byteturtle.eu/player/assets/img/default.png';

  return !Object.keys(artist).length ? null :
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
      <div className="recommended-shows">
        <h3>Recommended Shows</h3>
        <hr />
        { // Display error if shows could not be found
          error ? <p className="error-text">{ error }</p> : null
        }
        {
          recommendedShows.length ?
            <div className="show-list">
            { // Display all the recommended shows based on the current artist
              recommendedShows.map(show => {
                const showDate = parseDate(show.formatted_datetime)
                return (
                  <div className="show" key={ show.id }>
                    <a className="artist-pic-link"
                      href={ show.artists[0].website || show.artists[0].facebook_page_url }>
                      <div className="artist-icon">
                        <img
                          src={ show.artists[0].thumb_url }
                          alt={ show.artists[0].name } />
                      </div>
                    </a>
                    <h4>{ show.artists[0].name }</h4>
                    <p className="show-venue">{ show.venue.name }</p>
                    <p className="show-date">{`${showDate.day} @ ${showDate.time}`}</p>
                    <a className="show-tickets" href={ show.ticket_url }>
                      <div className="bandsintown-logo"/>
                      <span>Purchase Tickets</span>
                    </a>
                  </div>
                )
              })
            }
            </div> :
            <p>No recommended shows are coming up in your area</p>
        }
      </div>
    </div>
};
