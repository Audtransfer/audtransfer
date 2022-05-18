import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDeezerContext } from "../../contexts/Deezer";

const corsSolution = "https://cors-anywhere.herokuapp.com/";
const basicEndpoint = "https://api.deezer.com/user";
const deezerBackend = "http://localhost:5000/deezer"

export default function DeezerImport() {
	const dataTransfer = JSON.parse(sessionStorage.getItem('playlisToTransfer'));
	const { accessToken } = useDeezerContext();
	const [user, setUser] = useState();
	const history = useHistory();

	const [playlistId, setPlaylistId] = useState()

	useEffect(() => {
		//DEGUB TODO
		console.log(accessToken);

		axios.get(`${deezerBackend}User`, {
			params: { access: accessToken}
		})
		.then(response => setUser(response.data))
		.catch(err => console.log(err));

	}, [accessToken])

	const handleCreate = () => {
		axios.get(`${deezerBackend}CreatePlaylist`, {
			params: {
				access: accessToken,
				id: user.id,
				title: dataTransfer.playlistName
			}
		})
		.then(response => setPlaylistId(response.data))
		.catch(err => console.log(err));
	}
	
	const handleAdd = async () => {

		let tracksUrl = "";

		if(dataTransfer.playlistOrigin === "Deezer") {
			console.log("veio do deezer, se vira");
		}
		else {
			const tracksPromises = dataTransfer.tracks.map(async item => {
				const trackId = await handleSearch(item);
				return { trackId }
			})
			console.log(await Promise.all(tracksPromises));
		}

	}

	const handleSearch = async (item) => {
		const urlSearch = `${corsSolution}https://api.deezer.com/search?q=track:"${item.trackName}"artist:"${item.artistName}"&output=json&access_token=${accessToken}`
		const { data } = await axios.get(urlSearch);
		console.log(data);
		return data.data[0].id
	}

	return (
		<div className="create wrapper">
      {dataTransfer && (
        <>
          <div className="create-buttons">
            <button onClick={handleCreate}>Create the Playlist</button>
          </div>

					{playlistId && (
						<div className="create-buttons">
            	<button onClick={handleAdd}>Add tracks Playlist</button>
          	</div>
					)}

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
	)
}
