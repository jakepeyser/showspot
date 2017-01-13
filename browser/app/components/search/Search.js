import React from 'react';
import { Link } from 'react-router';

export default ({ artists, error, updateSearch }) => {
  return (
    <div id="search">
      <input className="artist-search"
        type="text" autoFocus
        placeholder="Search for artists..."
        onChange={ (evt) => updateSearch(evt.target.value) }/>
      { // Display possible error received when searching
        error ?
          <p className="error-text">error</p> : null
      }
      <div className="artists">
      { // Display result list of artists, sorted by # of followers
        artists.length ?
        artists.sort((a, b) => b.followers.total - a.followers.total)
          .map(artist => {
            // Grab the artist image or a default, if none
            const imageURL = artist.images.length ?
              artist.images[artist.images.length - 1].url :
              'https://d2gcv4sxt84gxu.cloudfront.net/assets/default-user-avatars-small-d5efadcf497ea7b3d86c6f8d148d66633a29ce78fa8391af628adf32d9989354.png';
            return (
              <div className="artist" key={ artist.id }>
                <div className="artist-icon">
                  <img
                    src={ imageURL }
                    alt={ artist.name } />
                </div>
                <div className="artist-info">
                  <p className="artist-name">{ artist.name }</p>
                  <p className="artist-followers">{ `${artist.followers.total} followers` }</p>
                </div>
                <div className="artist-genres">
                  { // Display the first five genres
                    artist.genres.slice(0, 5)
                      .map(genre => <p key={ genre }>{ genre }</p>)
                  }
                </div>
              </div>
            )
          }) :
          <p className="empty-search">No results</p>
      }
      </div>
    </div>
  )
};
