import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDeezerContext } from "../../contexts/Deezer";

const deezerBackend = "http://localhost:5000/deezer"

export default function DeezerImport() {
	const dataTransfer = JSON.parse(sessionStorage.getItem('playlisToTransfer'));
	const { accessToken } = useDeezerContext();
	const [user, setUser] = useState();
	const [playlistId, setPlaylistId] = useState()
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
		.then(response => setPlaylistId(response.data.id))
		.catch(err => console.log(err));
	}
	
	const handleAdd = async () => {
		//DEGUB TODO
		console.log(playlistId);

		const tracksPromises = dataTransfer.tracks.map(async item => {
			let trackId = await handleSearch(item)
			return trackId
		})
		console.log(await Promise.all(tracksPromises));

		// TODO
		// The search request is done both in front and back ends,
		// needs just do some logics, for adding a track in the specific playlist,
		// in backend just do a simple request, logics stays here
	}

	const handleSearch = async (item) => {
		const { data } = await axios.get(`${deezerBackend}SearchTrack`, {
			params: {
				artist: item.artistName,
				track: item.trackName
			}
		});
		return data.data[0].id || null;
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
