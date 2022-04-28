import { useEffect, useState } from "react"
import axios from "axios"
import PlaylistTranfer from "./PlaylistTranfer"
import { useYoutubeContext } from "../../../contexts/Youtube";

const youtubeEndPoint = "https://youtube.googleapis.com/youtube/v3"
const getPlaylistEndPoint = `${youtubeEndPoint}/playlists`
const getPlaylistItemEndPoint = `${youtubeEndPoint}/playlistItems`

export default function TrackLists({ id }) {
	const { accessToken } = useYoutubeContext();
	const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [playlistItems, setPlaylistItems] = useState();

  useEffect(() => {
    axios.get(`${getPlaylistEndPoint}?part=snippet&id=${id}`, { headers: { Authorization: "Bearer " + accessToken } })
      .then(response => { 
        setSelectedPlaylist(response.data.items[0]);
        axios.get(`${getPlaylistItemEndPoint}?part=snippet&playlistId=${response.data.items[0].id}`, { headers: { Authorization: "Bearer " + accessToken } })
        .then(response => {console.log(response.data)})
      })
      .catch(err => { console.log(err) });
  }, [accessToken, id, setSelectedPlaylist])

  return (
    <>
      {selectedPlaylist && (
        <>
          <PlaylistTranfer selected={selectedPlaylist} />
          <div className="playlist">
            <img className="playlist-image" src={selectedPlaylist.snippet.thumbnails.medium.url} alt="Profile" />
            <div className="playlist-info">
              <p className="playlist-info_name">Playlist name: {selectedPlaylist.snippet.title}</p>
              <p className="playlist-info_owner">Owner: {selectedPlaylist.snippet.channelTitle}</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
/*

            <ul className="playlist-table seamless">
              {playlistItems.items.map(item =>
                <li className="playlist-table__item" key={item.id}>{item.snippet.title}</li>
              )}
            </ul>

 */