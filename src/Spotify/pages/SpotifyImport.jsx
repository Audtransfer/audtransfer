import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSpotifyContext } from "../../contexts/Spotify";

const userEndpoint = "https://api.spotify.com/v1/me";

export default function SpotifyImport() {
  const dataTransfer = JSON.parse(sessionStorage.getItem('playlisToTransfer'));
  const { accessToken } = useSpotifyContext();
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get(userEndpoint, { headers: { Authorization: "Bearer " + accessToken }})
		.then(response => setUser(response.data))
		.catch(err => console.log(err));
  }, [accessToken]);

  const handleCreate = () => {
    let today = new Date();
		today = today.toLocaleString()
    axios.post(
			`https://api.spotify.com/v1/users/${user.id}/playlists`,
			{
				name: dataTransfer.playlistName,
				description: `Audtransfer created this at: ${today}`,
				public: true,
			},
			{ headers: { Authorization: "Bearer " + accessToken } }
		)
		.then((response) => {
			let tracksUrl = "";
			const urlBase = `https://api.spotify.com/v1/playlists/${response.data.id}/tracks?uris=`;
			dataTransfer.tracks.map((item) => {
				return (tracksUrl += "spotify%3Atrack%3A" + item.trackId + "%2C");
			});
			const urlForPost = `${urlBase}${tracksUrl}`;

			axios.post(urlForPost, null, {headers: { Authorization: "Bearer " + accessToken }})
			.then(() => {
				sessionStorage.clear();
				history.push("/success");
			});
		})
		.catch((err) => console.log(err));
  };

  return (
    <div className="create wrapper">
      {dataTransfer && (
        <>
          <div className="create-buttons">
            <button onClick={handleCreate}>Create the Playlist</button>
          </div>

          <h3 className="create-title">Playlist name: {dataTransfer.playlistName}</h3>
          <ul className="playlist-table seamless">
            {dataTransfer.tracks?.map((item) => (
              <li className="playlist-table__item" key={item.trackId}>
                {item.trackName} - {item.artistName}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}