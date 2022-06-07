import { useHistory } from "react-router-dom"

export default function PlaylistTransfer({ selected }) {
	const history = useHistory()

	const handleClick = () => {
		const playlistToTransfer = ({
			playlistId: selected.id,
			playlistName: selected.title,
			playlistType: selected.type,
			playlistOrigin: "Deezer",
			public: selected.collaborative,
			tracks: selected.tracks.data.map(item => {
				return {
					trackName: item.title,
					artistName: item.artist.name,
					trackId: item.id
				}
			})
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
