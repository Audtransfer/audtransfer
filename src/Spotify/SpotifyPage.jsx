import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTransferContext } from "../contexts/Transfer";
import { useSpotifyContext } from "../contexts/Spotify"

export default function SpotifyPage() {
	const [importFlag, setImportFlag] = useState(null)
	const [exportFlag, setExportFlag] = useState(null)
	
	const { dataTransfer } = useTransferContext()
	const { setAccessToken } = useSpotifyContext()
	
	const handleLogin = () => { window.location = "http://localhost:5000/loginSpotify" }

	//SPOTIFY ACCESS
	const { access_token } = getHashParams();
	function getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
				q = window.location.hash.substring(1);
		while ( (e = r.exec(q))) {
			 hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	useEffect(() => {
		if(!access_token) return
		setAccessToken(access_token)

		if(dataTransfer){
			setExportFlag(false)
			setImportFlag(true)
		}
		else{
			setExportFlag(true)
			setImportFlag(false)
		}

	}, [access_token, setAccessToken, setExportFlag, setImportFlag, dataTransfer])

	return (
		<div className="page">
			{!access_token && (<button onClick={handleLogin}>login to spotify</button>)}
			<>
				{exportFlag && (
					<Link to="/spotify/export">
						<button>Start Export</button>
					</Link>
				)}
				{importFlag && (
					<Link to={{pathname: "/spotify/import", state: {access_token}}}>
						<button>Start Import</button>
					</Link>
				)}
			</>
		</div>
	)
}
