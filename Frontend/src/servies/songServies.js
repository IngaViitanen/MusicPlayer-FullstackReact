export async function searchSongs(title) {
  let response = await fetch(
    `https://yt-music-api.herokuapp.com/api/yt/songs/${title}`
  );
  response = await response.json();
  console.log(response.content);
  return response.content.map((song) => ({
    active: false,
    id: song.videoId,
    title: song.name,
    artist: song.artist.name,
    image: song.thumbnails[1].url,
  }));
}

export async function searchArtists(title) {
  let response = await fetch(
    `https://yt-music-api.herokuapp.com/api/yt/artists/${title}`
  );
  response = await response.json();
  return response.content.map((artist) => ({
    active: false,
    id: artist.browseId,
    artist: artist.name,
    image: artist.thumbnails[1].url,
  }));
}

// export async function searchAlbums(title) {
//   let response = await fetch(
//     `https://yt-music-api.herokuapp.com/api/yt/albums/${title}`
//   );
//   response = await response.json();
//   return response.content.map((album) => ({
//     active: false,
//     title: album.name,
//     id: album.browseId,
//     artist: album.artist,
//     image: album.thumbnails[1].url,
//   }));
// }
