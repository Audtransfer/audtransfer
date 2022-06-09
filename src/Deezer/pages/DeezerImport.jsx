import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDeezerContext } from "../../contexts/Deezer";

const deezerBackend = "http://localhost:5000/deezer"

export default function DeezerImport() {
	const dataTransfer = JSON.parse(sessionStorage.getItem('playlisToTransfer'));
	const { accessToken } = useDeezerContext();
	const [user, setUser] = useState();
	const history = useHistory();

	useEffect(() => {
		//DEGUB TODO
		console.log(accessToken);

		axios.get(`${deezerBackend}User`, {params: { access: accessToken}})
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
		.then(async response => { await handleAdd(response.data.id) })
		.catch(err => console.log(err));
	}
	
	const handleAdd = async (playlistIdDeezer) => {
		const tracksPromises = dataTransfer.tracks.map(async item => {
			let trackId = await handleSearch(item)
			return trackId
		})
		let tracks = (await Promise.all(tracksPromises));
		handleAddBundle(tracks, playlistIdDeezer)
	}

	const handleAddBundle = (tracks, playlistIdDeezer) => {
		axios.get(`${deezerBackend}AddTrack`, {
			params: {
				access: accessToken,
				id: playlistIdDeezer,
				trackId: tracks.toString()
			}
		})
		.then(response => {
			console.log(response);
			// sessionStorage.clear();
			// history.push("/success");
		})
		.catch(err => console.log(err));
	}

	const handleSearch = async (item) => {
		const { data } = await axios.get(`${deezerBackend}SearchTrack`, {
			params: {
				artist: (item.artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace('$', 'S').replace('&', '')),
				track: (item.trackName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace('$', 'S').replace('&', ''))
			}
		});
		if (data.total === 0) return 1;
		return data.data[0].id;
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
	)
}
