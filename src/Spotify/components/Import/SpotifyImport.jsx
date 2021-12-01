import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

const userEndpoint = "https://api.spotify.com/v1/me";

export default function SpotifyImport() {
  const data = JSON.parse(sessionStorage.getItem('playlisToTransfer'))
  const access_token = useLocation().state.access_token;
  const [playlistPostId, setPlaylistPostId] = useState("")
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    axios.get(userEndpoint, { headers: { Authorization: "Bearer " + access_token } })
      .then(response => { setUser(response.data) })
      .catch(err => { console.log(err) });
  }, [access_token])

  const handleCreate = () => {
    let today = new Date();
    axios.post(`https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        "name": data.playlistName,
        "description": `Playlist created by: Audtransfer - ${today}`,
        "public": true
      },
      { headers: { Authorization: "Bearer " + access_token } })
      .then(response => { setPlaylistPostId(response.data.id) })
      .catch(err => console.log(err));
  }

  const handleTransfer = () => {
    let tracksUrl = ""
    const urlBase = `https://api.spotify.com/v1/playlists/${playlistPostId}/tracks?uris=`
    data.tracks.map(item => {
      return tracksUrl += "spotify%3Atrack%3A" + item.trackId + "%2C"
    })
    const urlForPost = `${urlBase}${tracksUrl}`;

    axios.post(urlForPost, null, { headers: { Authorization: "Bearer " + access_token } })
      .then(() => {
        sessionStorage.clear()
        history.push("/success") //TODO
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="create wrapper">
      {data && (
        <>
          <div className="create-buttons">
            <button onClick={handleCreate}>Create the Playlist</button>
            {playlistPostId && <button onClick={handleTransfer}>Transfer the Playlist</button>}
          </div>

          <h3 className="create-title">Playlist name: {data.playlistName}</h3>
          <ul className="playlist-table seamless">
            {data.tracks.map(item =>
              <li className="playlist-table__item" key={item.trackId}>
                {item.trackName} - {item.artistName}
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  )
}
