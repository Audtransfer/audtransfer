import { useEffect, useState } from "react"
import axios from "axios"
import PlaylistTranfer from "./PlaylistTranfer"
import { useYoutubeContext } from "../../../contexts/Youtube";

const getPlaylistEndPoint = "https://www.googleapis.com/youtube/v3/playlists/"

export default function TrackLists({ id }) {
	const { accessToken } = useYoutubeContext();
	const [selectedPlaylist, setSelectedPlaylist] = useState()

  useEffect(() => {
    axios.get(`${getPlaylistEndPoint}${id}`, { headers: { Authorization: "Bearer " + accessToken } })
      .then(response => { setSelectedPlaylist(response.data) })
      .catch(err => { console.log(err) });
  }, [accessToken, id, setSelectedPlaylist])

  return (
    <>
      {selectedPlaylist && (
        <>
          <PlaylistTranfer selected={selectedPlaylist} />
          <div className="playlist">
            <img className="playlist-image" src={selectedPlaylist.images[0].url} alt="Profile" />
            <div className="playlist-info">
              <p className="playlist-info_name">Playlist name: {selectedPlaylist.name}</p>
              <p className="playlist-info_owner">Owner: {selectedPlaylist.owner.display_name}</p>
            </div>

            <ul className="playlist-table seamless">
              {selectedPlaylist.tracks.items.map(item =>
                <li className="playlist-table__item" key={item.track.id}>{item.track.name}</li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
