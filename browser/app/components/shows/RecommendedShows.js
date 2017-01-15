import React from 'react';
import { parseDate } from '../utils';

export default ({ recommendedShows, location, locationChange, searchLocation, loading, error }) => {
  return (
    <div className="recommended-shows">
      <div className="recommended-shows-header">
        <h3>Recommended Shows</h3>
        <div className="shows-location">
          <input className="location-search"
            type="text" value={ location }
            placeholder="City, State"
            onChange={ (evt) => locationChange(evt.target.value) }/>
          <button onClick={ () => searchLocation() } >
            Submit
          </button>
        </div>
      </div>
      <hr />
      {
        !loading && recommendedShows.length ?
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
          <div className="no-results">
          { // Display loading gif or no results indicator
            loading ?
              <div className="loading-graphic" /> :
              <div>
              { // If no location, prompt the user to enter a search destination
                location ?
                  <div>
                  { // Display error if API call failed, otherwise no shows found
                    error ?
                      <p className="error-text">{ error }</p> :
                      <p>No upcoming recommended shows in this area</p>
                  }
                  </div> :
                  <p>{'Search a location to find recommended shows in that area'}</p>
              }
              </div>
          }
          </div>
      }
    </div>
  )
};
