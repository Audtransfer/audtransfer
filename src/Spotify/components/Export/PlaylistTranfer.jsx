import { useHistory } from "react-router";

export default function PlaylistTranfer({ selected }) {
	const history = useHistory()

	const handleClick = () => {
		const playlistToTransfer = ({
			playlistId: selected.id,
			playlistName: selected.name,
			playlistType: selected.type,
			playlistOrigin: "Spotify",
			public: selected.public,
			tracks: selected.tracks.items.map(item => {
				return {
					trackName: item.track.name,
					artistName: item.track.artists[0].name,
					trackId: item.track.id
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
