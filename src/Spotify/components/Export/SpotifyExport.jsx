import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import TrackLists from "./TrackLists";

const userEndpoint = "https://api.spotify.com/v1/me";
const userPlaylistEndpoint = "https://api.spotify.com/v1/me/playlists";

export default function SpotifyExport() {
	const access_token = useLocation().state.access_token;
	const [user, setUser] = useState({})
	const [data, setData] = useState({})
	const [selectedPlaylist, setSelectedPlaylist] = useState()

	useEffect(() => {
		axios.get(userEndpoint, {headers:{Authorization: "Bearer " + access_token}})
		.then(response => {setUser(response.data)})
		.catch(err => { console.log(err) });

		axios.get(userPlaylistEndpoint, {headers:{Authorization: "Bearer " + access_token}})
		.then(response => {setData(response.data)})
		.catch(err => { console.log(err) });
	},[access_token])

	return (<>
		{access_token && (
			<div className="export wrapper">
				{user && (
					<div className="user">
						{(user.images && user.images.length > 0) && (
							<img className="user_img" src={user.images[0].url} alt="Profile"/>
						)}
						<h3 className="user_name">Hi, {user.display_name}</h3>
						<p className="user_email">{user.email}</p>
					</div>
				)}


				<select 
					onChange={e => setSelectedPlaylist(e.currentTarget.value)} 
					value={selectedPlaylist} defaultValue=""
				>
					<option value="" disabled>Choose a playlist</option>
					{data.items && data.items.map(item => (
						<option key={item.id} value={item.id}>{item.name}</option>
					))}
				</select>

				{(selectedPlaylist && selectedPlaylist.length > 0) && 
					<TrackLists access_token={access_token} id={selectedPlaylist}/>
				}
			</div>
		)}
	</>)
}