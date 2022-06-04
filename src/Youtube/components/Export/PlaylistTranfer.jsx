import { useState } from "react"
import { useHistory } from "react-router";
import axios from "axios";
import { useYoutubeContext } from "../../../contexts/Youtube";

const youtubePlaylistItemEndPoint = "https://youtube.googleapis.com/youtube/v3/playlistItems"

export default function PlaylistTranfer({ selectedPlaylist }) {
	const history = useHistory();
	const { accessToken } = useYoutubeContext();
	const [playlistItemsT, setPlaylistItemsT] = useState([]);
	const [nextPageToken, setNextPageToken] = useState("");
	const [erro, setErro] = useState(false);

	const handleLoad = () => {
		while(!erro && nextPageToken)
		{
			axios.get(`${youtubePlaylistItemEndPoint}?part=snippet&playlistId=${selectedPlaylist.id}&maxResults=50&pageToken=${nextPageToken}`, { headers: { Authorization: "Bearer " + accessToken } })
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
			playlistId: selectedPlaylist.id,
			playlistName: selectedPlaylist.snippet.title,
			playlistType: selectedPlaylist.kind,
			playlistOrigin: "YouTube Music",
			public: selectedPlaylist.status.privacyStatus === 'public',//"public" -> true; "private" || "unlisted" -> false
			tracks: playlistItemsT.map(item => {
				return {
					trackName: item.snippet.title,
					artistName: item.snippet.videoOwnerChannelTitle,
					trackId: item.id
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