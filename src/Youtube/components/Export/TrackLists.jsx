import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import PlaylistTranfer from "./PlaylistTranfer"
import { useYoutubeContext } from "../../../contexts/Youtube";

const youtubeEndPoint = "https://youtube.googleapis.com/youtube/v3"
const getPlaylistEndPoint = `${youtubeEndPoint}/playlists`
const getPlaylistItemEndPoint = `${youtubeEndPoint}/playlistItems`

export default function TrackLists({ id }) {
  const { accessToken } = useYoutubeContext();
  const [selectedPlaylist, setSelectedPlaylist] = useState();
  const [playlistItems, setPlaylistItems] = useState([]);

  const callback = useCallback(async (token) => {
    const query = `${getPlaylistItemEndPoint}?part=snippet&playlistId=${id}&maxResults=50&pageToken=${token}`;
    const response = await axios.get(query, { headers: { Authorization: "Bearer " + accessToken } });
    const data = response.data;
    console.log(data);
    setPlaylistItems(oldArray => [...oldArray, data.items]);
    if (data.nextPageToken) {
      return await callback(data.nextPageToken);
    }
    else {
      return data.items;
    }
  }, [accessToken, id]);

  // const getPlaylist = async (token) => {
  //   const query = `${getPlaylistItemEndPoint}?part=snippet&playlistId=${id}&maxResults=50&pageToken=${token}`;
  //   const response = await axios.get(query, { headers: { Authorization: "Bearer " + accessToken } });
  //   const data = response.data;
  //   console.log(data);
  //   setPlaylistItems(oldArray => [...oldArray, data.items]);
  //   if (data.nextPageToken) {
  //     return await getPlaylist(data.nextPageToken);
  //   }
  //   else {
  //     return data.items;
  //   }
  // }

  useEffect(() => {
    axios.get(`${getPlaylistEndPoint}?part=snippet%2Cstatus&id=${id}`, { headers: { Authorization: "Bearer " + accessToken } })
    .then(response => setSelectedPlaylist(response.data.items[0]))
    .then(() => {
      setPlaylistItems(oldArray => [...oldArray, callback("")]);
    })
    .catch(err => { console.log(err) });
  }, [accessToken, id, setSelectedPlaylist, callback])

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

            {/* {
              playlistItems && (
                <ul className="playlist-table seamless">
                  {playlistItems.map(item =>
                    <li className="playlist-table__item" key={item.id}>{item.snippet.title}</li>
                  )}
                </ul>
              )
            } */}
          </div>
        </>
      )}
    </>
  )
}