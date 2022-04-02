import axios from "axios"
import { useEffect } from "react"
import PlaylistTranfer from "./PlaylistTranfer"
import { useSpotifyContext } from "../../../contexts/Spotify";
import { useTransferContext } from "../../../contexts/Transfer";

const getPlaylistEndPoint = "https://api.spotify.com/v1/playlists/"

export default function TrackLists({ id }) {
	const { accessToken } = useSpotifyContext();
	const { dataTransfer, setDataTransfer } = useTransferContext();

  useEffect(() => {
    axios.get(`${getPlaylistEndPoint}${id}`, { headers: { Authorization: "Bearer " + accessToken } })
      .then(response => { setDataTransfer(response.data) })
      .catch(err => { console.log(err) });
  }, [accessToken, id, setDataTransfer])

  return (
    <>
      {dataTransfer && (
        <>
          <PlaylistTranfer />
          <div className="playlist">
            <img className="playlist-image" src={dataTransfer.images[0].url} alt="Profile" />
            <div className="playlist-info">
              <p className="playlist-info_name">Playlist name: {dataTransfer.name}</p>
              <p className="playlist-info_owner">Owner: {dataTransfer.owner.display_name}</p>
            </div>

            <ul className="playlist-table seamless">
              {dataTransfer.tracks.items.map(item =>
                <li className="playlist-table__item" key={item.track.id}>{item.track.name}</li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
