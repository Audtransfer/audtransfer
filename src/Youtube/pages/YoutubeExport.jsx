import axios from "axios";
import { useEffect, useState } from "react";
import { useYoutubeContext } from "../../contexts/Youtube";
import TrackLists from "../components/Export/TrackLists";

const youtubeEndpoint = "https://youtube.googleapis.com/youtube/v3";
const youtubeUserEndpoint = `${youtubeEndpoint}/channels`;
const youtubePlaylistEndpoint = `${youtubeEndpoint}/playlists`;

export default function YoutubeExport() {
  const { accessToken } = useYoutubeContext();
  const [user, setUser] = useState({})
  const [data, setData] = useState({})
  const [selectedPlaylist, setSelectedPlaylist] = useState()

  useEffect(() => {
    axios.get(`${youtubeUserEndpoint}?part=snippet&mine=true`, { headers: { Authorization: "Bearer " + accessToken } })
      .then(response => {
        setUser(response.data.items[0]);
        axios.get(`${youtubePlaylistEndpoint}?part=snippet&mine=true`, { headers: { Authorization: "Bearer " + accessToken } })
          .then(response => setData(response.data))
      })
      .catch(err => console.log(err));
  }, [accessToken])

  return (<>
    {accessToken && (
      <div className="wrapper export">
        {user.snippet && (
          <div className="user">
            {user.snippet.thumbnails.default && (
              <img className="user_img" src={user.snippet.thumbnails.default.url} alt="Profile" />
            )}
            <h3 className="user_name">
              Hi, {user.snippet.title}
            </h3>
          </div>
        )}

        <select
          onChange={e => setSelectedPlaylist(e.currentTarget.value)}
          value={selectedPlaylist} defaultValue=""
        >
          <option value="" disabled>Choose a playlist</option>
          {data.items && data.items.map(item => (
            <option key={item.id} value={item.id}>{item.snippet.title}</option>
          ))}
        </select>

        {(selectedPlaylist && selectedPlaylist.length > 0) &&
          <TrackLists id={selectedPlaylist} />
        }
      </div>
    )}
  </>)
}