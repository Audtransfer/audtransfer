import { useState } from "react"
import { useHistory } from "react-router";
import axios from "axios";
import { useYoutubeContext } from "../../../contexts/Youtube";

const youtubePlaylistItemEndPoint = "https://youtube.googleapis.com/youtube/v3/playlistItems"

export default function PlaylistTranfer({ selected }) {
	const history = useHistory();
	const { accessToken } = useYoutubeContext();
	const [playlistItemsT, setPlaylistItemsT] = useState([]);
	const [nextPageToken, setNextPageToken] = useState("");
	const [erro, setErro] = useState(false);

	const handleLoad = () => {
		while(!erro && nextPageToken)
		{
			axios.get(`${youtubePlaylistItemEndPoint}?part=snippet&playlistId=${selected.id}&maxResults=50&pageToken=${nextPageToken}`, { headers: { Authorization: "Bearer " + accessToken } })
			.then(response => {
				setPlaylistItemsT(oldArray => [...oldArray, ...response.data.items]);
				console.log(response.data.items);
				setNextPageToken(response.data.nextPageToken);
				console.log(response.data.nextPageToken);
			})
			.catch(err => { console.log(err); setErro(true); });
		}
	}

	const handleClick = () => {
		const playlistToTransfer = ({
			playlistId: selected.id,
			playlistName: selected.snippet.title,
			playlistType: selected.kind,
			playlistOrigin: "YouTube Music",
			public: selected.status.privacyStatus === 'public',//"public" -> true; "private" || "unlisted" -> false
			tracks: playlistItemsT.map(item => {
				return {
					trackName: item.snippet.title,
					artistName: item.snippet.videoOwnerChannelTitle,
					trackId: item.snippet.resourceId.videoId //usado ao transferir para youtube
				}
			}),
		})
		console.log(playlistToTransfer);
		sessionStorage.setItem('playlisToTransfer', JSON.stringify(playlistToTransfer));
		history.push("/");
	}

	return (
		<>
			<button onLoadStart={() => handleLoad()} onClick={() => handleClick()} className="button-submit">Transfer this playlist</button>
		</>
	)
}