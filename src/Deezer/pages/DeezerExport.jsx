import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { useDeezerContext } from "../../contexts/Deezer";
import Tracklist from '../components/Tracklist';

const deezerBackend = "http://localhost:5000/deezer"

export default function DeezerExport() {
	const { accessToken } = useDeezerContext();
	const [user, setUser] = useState({})
	const [data, setData] = useState({})
	const [selectedPlaylist, setSelectedPlaylist] = useState()

	useEffect(() => {
		//DEGUB TODO
		console.log(accessToken);
		
		axios.get(`${deezerBackend}User`, {
			params: { access: accessToken}
		})
		.then(response => {
			setUser(response.data)
			return response.data
		})
		.then(response => {
			axios.get(`${deezerBackend}Playlist`, {
				params: { 
					access: accessToken,
					id: response.id
				}
			})
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
