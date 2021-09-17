import React, { useEffect, useState, useRef } from "react";
import MediaItem from "./components/MediaItem";
import {
  searchSongs,
  searchArtists,
  searchAlbums,
} from "../servies/songServies";
import Player from "./components/Player";

function MusicPlayer() {
  const [itemList, setItemList] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState("");
  const [currentSongId, setCurrentSongId] = useState("");
  const [playingState, setPlayingState] = useState(false);
  const [activeSong, setActiveSong] = useState({});

  const playerObj = useRef();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type here"
              aria-label="Search song"
              aria-describedby="basic-addon2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div
            className="btn-group btn-group-toggle mb-4 "
            data-toggle="buttons"
          >
            <label
              className="btn btn-primary active"
              onClick={() => onSearch("song")}
            >
              <input type="radio" name="options" id="option1" />
              Songs
            </label>
            <label
              className="btn btn-primary"
              onClick={() => onSearch("artist")}
            >
              <input
                type="radio"
                name="options"
                id="option2"
                onClick={() => onSearch("artist")}
              />
              Artist
            </label>
            <label
              className="btn btn-primary"
              onClick={() => onSearch("album")}
            >
              <input
                type="radio"
                name="options"
                id="option3"
                onClick={() => onSearch("album")}
              />
              Album
            </label>
          </div>

          <div className="songList">
            <div className="list-group">
              {itemList.map((song) => (
                <MediaItem
                  active={song.active}
                  type={type}
                  title={song.title}
                  artist={song.artist}
                  image={song.image}
                  id={song.id}
                  onClick={() => playNewSong(song.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-center">
                <Player onLoad={onPlayerLoad} />
                {activeSong && (
                  <img
                    src={activeSong.image}
                    alt=""
                    height="auto"
                    width="60%"
                    className="img img-thumbnail"
                  />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <h3>{activeSong?.title}</h3>
              </div>
              <div className="d-flex justify-content-center">
                <h5>{activeSong?.artist}</h5>
              </div>
              {/*               <div className="d-flex mt-4">
                <span className="" style={{ flex: 1 }}>
                  02:31
                </span>
                <div className="progress" style={{ flex: 7, marginTop: "5px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <span style={{ flex: 1, textAlign: "end" }}>
                  {timeFormater(duration)}
                </span>
              </div> */}
            </div>
            {activeSong && (
              <div className="d-flex justify-content-center pt-5">
                <div>
                  <button
                    className="btn btn-primary rounded-circle btn-lg"
                    onClick={() => prevNextSong(false)}
                  >
                    <i className="fa fa-step-backward"></i>
                  </button>
                  <button
                    className="btn btn-primary rounded-circle btn-lg mx-3"
                    onClick={startStopSong}
                  >
                    <i
                      className={playingState ? "fa fa-pause" : "fa fa-play"}
                    ></i>
                  </button>
                  <button
                    className="btn btn-primary rounded-circle btn-lg"
                    onClick={() => prevNextSong(true)}
                  >
                    <i className="fa fa-step-forward"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /**
 * fetches song,artist or album from the youtube
 * @param {string} type
 */

  async function onSearch(type) {
    // console.log(type)
    setType(type);
    if (type == "song") {
      let songs = await searchSongs(title);
      setItemList(songs);
    } else if (type == "album") {
      let albums = await searchAlbums(title);
      setItemList(albums);
    } else if (type == "artist") {
      let artists = await searchArtists(title);
      setItemList(artists);
    }
  }
  /**
   * Initializes the player
   * @param {Object} player
   */
  function onPlayerLoad(player) {
    setTimeout(() => {
      playerObj.current = player;
    }, 3000);
  }

  /**
   * Plays previous song or next song
   * @param {boolean} next
   */
  function prevNextSong(next) {
    let nextSongObj;
    let playingSong = itemList.find((item) => {
      return item.id == currentSongId;
    });
    let index = itemList.indexOf(playingSong);
    if (next) {
      nextSongObj = itemList[index + 1];
    } else {
      nextSongObj = itemList[index - 1];
    }
    playNewSong(nextSongObj.id);
  }

  /**
   * Plays new song by id
   * @param  {String} songId - youtube videoId
   * @returns {Object}
   * */
  function playNewSong(songId) {
    setCurrentSongId(songId);
    playerObj.current.loadVideoById(songId);
    setPlayingState(true);

    // adds active class to current playing song
    setItemList(
      itemList.map((item) => {
        if (item.id == songId) {
          item.active = true;
          setActiveSong(item);
        } else {
          item.active = false;
        }
        return item;
      })
    );
    setTimeout(() => {
      setDuration(playerObj.current.getDuration());
    }, [3000]);
  }

  /**
   * Starts and stops the songs
   */
  function startStopSong() {
    if (playingState) {
      playerObj.current.pauseVideo();
      setPlayingState(false);
    } else {
      playerObj.current.playVideo();
      setPlayingState(true);
    }
  }

  /**
   * Formats time in seconds to mm:ss
   * @param {string} time
   * @returns {String}
   */
  function timeFormater(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return minutes + ":" + Math.round(seconds);
  }
}

export default MusicPlayer;