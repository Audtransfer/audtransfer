import { useHistory } from "react-router";

export default function PlaylistTranfer({ selectedPlaylist, playlistItems }) {
	const history = useHistory()

	const handleClick = () => {
		const playlistToTransfer = ({
			playlistId: selectedPlaylist.id,
			playlistName: selectedPlaylist.snippet.title,
			playlistType: selectedPlaylist.kind,
			playlistOrigin: "YouTube",
			public: selectedPlaylist.status.privacyStatus === 'public',//"public" -> true; "private" || "unlisted" -> false
			tracks: playlistItems.map(item => {
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
			<button onClick={() => handleClick()} className="button-submit">Transfer this playlist</button>
		</>
	)
}