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
    .then(response => setUser(response.data.items[0]))
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
      </div>
    )}
  </>)
}