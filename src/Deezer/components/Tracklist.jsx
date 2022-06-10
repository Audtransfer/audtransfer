import axios from 'axios';
import { useEffect, useState } from 'react';
import PlaylistTransfer from './PlaylistTransfer';

const deezerBackend = "http://localhost:5000/deezer"

export default function Tracklist({ id }) {
	const [selectedPlaylist, setSelectedPlaylist] = useState();

	useEffect(() => {

		axios.get(`${deezerBackend}AnyPlaylist`, {
			params: { id: id }
		})
		.then(response => setSelectedPlaylist(response.data))
		.catch(err => { console.log(err) });
	}, [id])

	return (
		<>
			{selectedPlaylist && (
				<>
				<PlaylistTransfer selected={selectedPlaylist} />
				<div className="playlist">
					<img className="playlist-image" src={selectedPlaylist.picture} alt="Profile" />
					<div className="playlist-info deezer">
						<p className="playlist-info_name">Playlist name: {selectedPlaylist.title}</p>
						<p className="playlist-info_owner">Owner: {selectedPlaylist.creator.name}</p>
            <p className="playlist-info_total">Total: {selectedPlaylist.tracks.data.length}</p>
					</div>

					<ul className="playlist-table seamless">
						{selectedPlaylist.tracks.data.map(item =>
							<li className="playlist-table__item" key={item.id}>{item.title}</li>
						)}
					</ul>
				</div>
			</>
			)}
		</>
	)
}
