import axios from "axios"
import { useEffect, useState } from "react"
import PlaylistTranfer from "./PlaylistTranfer"

const getPlaylistEndPoint = "https://api.spotify.com/v1/playlists/"

export default function TrackLists({ access_token, id }) {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get(`${getPlaylistEndPoint}${id}`, { headers: { Authorization: "Bearer " + access_token } })
      .then(response => { setData(response.data) })
      .catch(err => { console.log(err) });
  }, [access_token, id])

  return (
    <>
      {data && (
        <>
          <PlaylistTranfer playlist={data} />
          <div className="playlist">
            <img className="playlist-image" src={data.images[0].url} alt="Profile" />
            <div className="playlist-info">
              <p className="playlist-info_name">Playlist name: {data.name}</p>
              <p className="playlist-info_owner">Owner: {data.owner.display_name}</p>
            </div>

            <ul className="playlist-table seamless">
              {data.tracks.items.map(item =>
                <li className="playlist-table__item" key={item.track.id}>{item.track.name}</li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
