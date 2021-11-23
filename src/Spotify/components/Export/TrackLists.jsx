import axios from "axios"
import { useEffect, useState } from "react"
import PlaylistTranfer from "./PlaylistTranfer"

const getPlaylistEndPoint = "https://api.spotify.com/v1/playlists/"

export default function TrackLists({ access_token, id }) {
	const [data, setData] = useState()

	useEffect(() => {
		axios.get(`${getPlaylistEndPoint}${id}`, {headers:{Authorization: "Bearer " + access_token}})
		.then(response => { setData(response.data) })
		.catch(err => { console.log(err) });
	}, [access_token, id])

	return (
		<div className="playlist">
			{data && (
				<>
					<p className="playlist_name">Playlist name: {data.name}</p>
					<p className="playlist_owner">Owner: {data.owner.display_name}</p>
					<img className="playlist_img" src={data.images[0].url} alt="Profile"/>
					<PlaylistTranfer playlist={data} />
					{data.tracks.items.map(item => 
						<p className="playlist_trackItem" key={item.track.id}>{item.track.name}</p>
					)}
				</>
			)}
		</div>
	)
}
