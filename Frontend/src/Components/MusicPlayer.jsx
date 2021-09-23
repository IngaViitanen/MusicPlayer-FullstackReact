import React, { useState, useRef } from "react";
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
  const [activeSong, setActiveSong] = useState(null);

  const playerObj = useRef();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Songs
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Playslists
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
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
                  {itemList.map((song, index) => (
                    <MediaItem
                      key={index}
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
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div id="accordion">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                      <div style={{ position: "absolute", right: "1rem" }}>
                        <button className="btn btn-sm btn-success">
                          <i className="fa fa-share-alt"></i>
                        </button>
                        <button class="btn btn-sm btn-primary">
                          <i className="fa fa-play"></i>
                        </button>
                        <button class="btn btn-sm btn-danger">
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                      <div
                        className="btn btn-link d-flex justify-content-between"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span>My favorit Songs</span>
                      </div>
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    class="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div class="card-body">
                      <MediaItem
                        active={false}
                        type="song"
                        title="Do for love"
                        artist="Tupac"
                        image="https://lh3.googleusercontent.com/RqxxrayOugwf0OTf…Fuz8JUhOOtBgBYzca_fHBgVSiAxa9QLG=w120-h120-l90-rj"
                        id='1'
                        onClick={() => playNewSong(1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
              {activeSong && (
                <div className="d-flex mt-4">
                  <span className="" style={{ flex: 1 }}>
                    {timeFormater(currentTime)}
                  </span>
                  <div className="" style={{ flex: 7, marginTop: "5px" }}>
                    <input
                      value={currentTime}
                      type="range"
                      className="form-range w-100"
                      min="0"
                      max={duration}
                      id="customRange2"
                      onChange={(e) => updateProgress(e.target.value)}
                    ></input>
                  </div>
                  <span style={{ flex: 1, textAlign: "end" }}>
                    {timeFormater(duration)}
                  </span>
                </div>
              )}
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
      setCurrentTime(playerObj.current.getCurrentTime());
      intervalPointer = counter();
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

  function counter() {
    return setInterval(() => {
      setCurrentTime(playerObj.current.getCurrentTime());
    }, 1000);
  }

  function updateProgress(secs) {
    playerObj.current.seekTo(secs);
  }
}

export default MusicPlayer;
