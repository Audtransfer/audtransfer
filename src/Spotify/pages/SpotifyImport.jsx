import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSpotifyContext } from "../../contexts/Spotify";

const basicEndpoint = "https://api.spotify.com/v1";

export default function SpotifyImport() {
  const dataTransfer = JSON.parse(sessionStorage.getItem('playlisToTransfer'));
  const { accessToken } = useSpotifyContext();
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    axios.get(`${basicEndpoint}/me`, { headers: { Authorization: "Bearer " + accessToken }})
		.then(response => setUser(response.data))
		.catch(err => console.log(err));
  }, [accessToken]);

  const handleCreate = () => {
    let today = new Date();
		today = today.toLocaleString("pt-BR");
    axios.post(
			`${basicEndpoint}/users/${user.id}/playlists`,
			{
				name: dataTransfer.playlistName,
				description: `Audtransfer created this at: ${today}`,
				public: true,
			},
			{headers: {Authorization: "Bearer " + accessToken }}
		)
		.then(async response => {
			let tracksUrl = "";

			if(dataTransfer.playlistOrigin === "Spotify") {
				tracksUrl = buildTrack(dataTransfer.tracks)
			}
			else {
				const trackPromises = dataTransfer.tracks.map(async item => {
					const trackId = await handleSearch(item);
					return { trackId }
				})
				const trackResponse = await Promise.all(trackPromises)
				tracksUrl = buildTrack(trackResponse)
			}

			handleAdd(response.data.id, tracksUrl);
		})
		.catch((err) => console.log(err));
  };

	const buildTrack = (tracks) => {
		let list = "";
		tracks.forEach(item => {
			list += "spotify%3Atrack%3A" + item.trackId + "%2C";
		});
		return list
	}

	const handleSearch = async (item) => {
		const { data } = await axios.get(
			`${basicEndpoint}/search?q=track%3A${item.trackName}%20artist:%3A${item.artistName}&type=track`,
			{headers: {Authorization: "Bearer " + accessToken}}
		);
		return data.tracks.items[0].id;
	}
	
	const handleAdd = (newPlaylistId, tracksUrl) => {
		const urlBase = `${basicEndpoint}/playlists/${newPlaylistId}/tracks?uris=`;
		let urlForPost = `${urlBase}${tracksUrl}`;

		axios.post(urlForPost, null, {headers: { Authorization: "Bearer " + accessToken }})
		.then(() => {
			sessionStorage.clear();
			history.push("/success");
		});
	}

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