import React from "react";
// import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../Constants/apiContants";

function ShowPlaylist({ playlists }) {
  console.log(playlists)

  return (
    <ul className="list-group">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id={"playlist" + playlist.id}
              value="option1"
            />
            <label className="form-check-label" htmlFor={"playlist" + playlist.id}>
              {playlist.Playlist_name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShowPlaylist;
