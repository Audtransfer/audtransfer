import axios from "axios";
import { useEffect, useState } from "react";
import { useSpotifyContext } from "../../contexts/Spotify";
import TrackLists from "../components/Export/TrackLists";

const userEndpoint = "https://api.spotify.com/v1/me";
const userPlaylistEndpoint = `${userEndpoint}/playlists`;

export default function SpotifyExport() {
	const { accessToken } = useSpotifyContext();
	const [user, setUser] = useState({})
	const [data, setData] = useState({})
	const [selectedPlaylist, setSelectedPlaylist] = useState()

	useEffect(() => {
		axios.get(userEndpoint, {headers:{Authorization: "Bearer " + accessToken}})
		.then(response => {
			setUser(response.data);
			axios.get(userPlaylistEndpoint, {headers:{Authorization: "Bearer " + accessToken}})
			.then(response => {setData(response.data)})
		})
		.catch(err => { console.log(err) });
	},[accessToken])

	return (<>
		{accessToken && (
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
					<TrackLists id={selectedPlaylist}/>
				}
			</div>
		)}
	</>)
}