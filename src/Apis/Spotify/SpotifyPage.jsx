import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const clientId = "" //TODO

const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
const redirect = "http://localhost:3000/spotify";

const scopes = [
	"user-read-private",
	"user-read-email",
	"user-library-read",
	"playlist-read-collaborative",
	"playlist-read-private",
	"playlist-modify-private",
	"playlist-modify-public",
];
const scopesUrl = scopes.join("%20");

export default function SpotifyPage() {
	const [importFlag, setImportFlag] = useState(null)
	const [exportFlag, setExportFlag] = useState(null)

	const handleLogin = () => {
		window.location = 
			spotifyAuthEndpoint + 
			"?client_id=" + clientId + 
			"&redirect_uri=" + redirect + 
			"&scope=" + scopesUrl + 
			"&response_type=token&show_dialog=true";
		console.log(clientId);
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
			spotifyPage
			{!access_token && (<button onClick={handleLogin}>login to spotify</button>)}
			<div>
				{importFlag &&
					<Link to={{pathname: "/spotify/import", state: {access_token}}}>
						<button>Import a playlist</button>
					</Link>
				}
				{exportFlag && 
					<Link to={{pathname: "/spotify/export", state: {access_token}}}>
						<button>Export a playlist</button>
					</Link>
				}
			</div>
		</div>
	)
}
