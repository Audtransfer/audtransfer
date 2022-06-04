import { useEffect, useState } from "react"
import axios from "axios"
import PlaylistTranfer from "./PlaylistTranfer"
import { useYoutubeContext } from "../../../contexts/Youtube";

const youtubeEndPoint = "https://youtube.googleapis.com/youtube/v3"
const getPlaylistItemEndPoint = `${youtubeEndPoint}/playlistItems`

export default function TrackLists({ selectedPlaylist }) {
  const { accessToken } = useYoutubeContext();
  const [playlistItems, setPlaylistItems] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    setPlaylistItems([]);
    setToken("");
  }, [selectedPlaylist]);
  
  useEffect(() => {
    axios.get(`${getPlaylistItemEndPoint}?part=snippet&playlistId=${selectedPlaylist.id}&maxResults=50&pageToken=${token}`, { headers: { Authorization: "Bearer " + accessToken } })
    .then(response => {
      const data = response.data;
      setPlaylistItems(oldArray => [...oldArray, ...data.items]);

      if (data.nextPageToken) {
        setToken(data.nextPageToken);
      }
    })
    .catch(err => { console.log(err) });
  }, [accessToken, selectedPlaylist, token])

  return (
    <>
      {selectedPlaylist && (
        <>
          <PlaylistTranfer selectedPlaylist={selectedPlaylist} playlistItems={playlistItems} />
          <div className="playlist">
            <img className="playlist-image" src={selectedPlaylist.snippet.thumbnails.medium.url} alt="Profile" />
            <div className="playlist-info">
              <p className="playlist-info_name">Playlist name: {selectedPlaylist.snippet.title}</p>
              <p className="playlist-info_owner">Owner: {selectedPlaylist.snippet.channelTitle}</p>
            </div>

            {
              playlistItems && (
                <ul className="playlist-table seamless">
                  {playlistItems.map(item =>
                    <li className="playlist-table__item" key={item.id}>{item.snippet.title}</li>
                  )}
                </ul>
              )
            }
          </div>
        </>
      )}
    </>
  )
}