import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SpotifyPage() {
	const [importFlag, setImportFlag] = useState(null)
	const [exportFlag, setExportFlag] = useState(null)
	
	const handleLogin = () => {
		window.location = "http://localhost:5000/loginSpotify"
	}

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
		if(!sessionStorage.getItem('playlisToTransfer')) {
			setExportFlag(true)
			setImportFlag(false)
		}
		else {
			setExportFlag(false)
			setImportFlag(true)
		}
	}, [access_token])

	return (
		<div className="page">
			{!access_token && (<button onClick={handleLogin}>login to spotify</button>)}
			<>
				{importFlag &&
					<Link to={{pathname: "/spotify/import", state: {access_token}}}>
						<button>Start Import</button>
					</Link>
				}
				{exportFlag && 
					<Link to={{pathname: "/spotify/export", state: {access_token}}}>
						<button>Start Export</button>
					</Link>
				}
			</>
		</div>
	)
}
