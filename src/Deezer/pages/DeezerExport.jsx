import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { useDeezerContext } from "../../contexts/Deezer";
import Tracklist from '../components/Tracklist';

const corsSolution = "https://cors-anywhere.herokuapp.com/";
const basicEndpoint = "https://api.deezer.com/user";
const userEndpoint = `${basicEndpoint}/me`;

export default function DeezerExport() {
	const { accessToken } = useDeezerContext();
	const [user, setUser] = useState({})
	const [data, setData] = useState({})
	const [selectedPlaylist, setSelectedPlaylist] = useState()

	useEffect(() => {
		//DEGUB
		console.log(accessToken);

		// TODO URGENT, solve cors problem without using heroku app!!!!
		axios.get(`${corsSolution}${userEndpoint}?output=json&access_token=${accessToken}`)
		.then(response => {
			setUser(response.data)

			axios.get(`${corsSolution}${basicEndpoint}/${response.data.id}/playlists`)
			.then(response => setData(response.data))
		})
		.catch(err => { console.log(err) });

	}, [accessToken])
	
	return (<>
	{accessToken && (
		<div className="export wrapper">
			{user && (
				<div className="user">
					{user.picture && (
						<img className="user_img" src={user.picture} alt="Profile"/>
					)}
					<h3 className="user_name">Hi, {user.name}</h3>
					<p className="user_email">{user.email}</p>
				</div>
			)}

				<select 
					onChange={e => setSelectedPlaylist(e.currentTarget.value)} 
					value={selectedPlaylist} defaultValue=""
				>
					<option value="" disabled>Choose a playlist</option>
					{data.data && data.data.map(item => (
						<option key={item.id} value={item.id}>{item.title}</option>
					))}
				</select>

				{selectedPlaylist &&  <Tracklist id={selectedPlaylist} />}

		</div>
	)}
	</>)
}
