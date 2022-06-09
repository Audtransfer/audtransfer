import { useEffect } from "react";
import { useYoutubeContext } from "../contexts/Youtube"
import { useHistory } from "react-router";

export default function YoutubePage() {
	const dataTransfer = sessionStorage.getItem('playlisToTransfer');
	const { setAccessToken } = useYoutubeContext();
	const history = useHistory();
	
	const handleLogin = () => { window.location = "http://localhost:5000/loginYoutube" }

	//SPOTIFY ACCESS
	const { access_token } = getHashParams();
	function getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
		while ((e = r.exec(q))) { hashParams[e[1]] = decodeURIComponent(e[2]); }
		return hashParams;
	}

	useEffect(() => {
		if(!access_token) handleLogin()
		setAccessToken(access_token)

		if(dataTransfer) { history.push("/youtube/import") }
		else { history.push("/youtube/export") }
	}, [access_token, setAccessToken, dataTransfer, history])

	return (<div className="page"></div>)
}
