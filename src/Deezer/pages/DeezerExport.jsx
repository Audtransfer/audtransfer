import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { useDeezerContext } from "../../contexts/Deezer";

export default function DeezerExport() {
	const { accessToken } = useDeezerContext();
	const [user, setUser] = useState({})
	const [data, setData] = useState({})

	useEffect(() => {
		console.log(accessToken);

		//BLOCKED CORS
		// axios.get(`https://api.deezer.com/user/me?output=jsonp&access_token=${accessToken}`)
		// .then(response => console.log(response))
		// .catch(err => { console.log(err) });

	}, [accessToken])
	
	return (<>
	{accessToken && (
		<div className="export wrapper">
			{/* {user && (
				<div className="user">
					{(user.images && user.images.length > 0) && (
						<img className="user_img" src={user.images[0].url} alt="Profile"/>
					)}
					<h3 className="user_name">Hi, {user.display_name}</h3>
					<p className="user_email">{user.email}</p>
				</div>
			)} */}
		</div>
	)}
	</>)
}
