import { useHistory } from "react-router";
import { useTransferContext } from "../../../contexts/Transfer";

export default function PlaylistTranfer() {
	const { dataTransfer, setDataTransfer  } = useTransferContext();
	const history = useHistory()

	const handleClick = () => {
		const playlistToTransfer = ({
			playlistId: dataTransfer.id,
			playlistName: dataTransfer.name,
			playlistType: dataTransfer.type,
			playlistOrigin: "Spotify",
			public: dataTransfer.public,
			tracks: dataTransfer.tracks.items.map(item => {
				return {
					trackName: item.track.name,
					artistName: item.track.artists[0].name,
					trackId: item.track.id
				}
			}),
		})
		console.log(playlistToTransfer);
		setDataTransfer(playlistToTransfer)
		history.push("/")
	}

	return (
		<>
			<button onClick={() => handleClick()} className="button-submit">Transfer this playlist</button>
		</>
	)
}
