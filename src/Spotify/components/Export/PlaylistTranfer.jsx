import { useEffect, useState } from "react"
import { useHistory } from "react-router"

export default function PlaylistTranfer({playlist}) {
	const [data, setData] = useState(null)
	const history = useHistory()

	useEffect(() => {
		if(!data) return

		const playlistToTransfer = ({
			playlistId: data.id,
			playlistName: data.name,
			playlistType: data.type,
			public: data.public,
			tracks: data.tracks.items.map(item => {
				return {
					trackName: item.track.name,
					artistName: item.track.artists[0].name,
					trackId: item.track.id
				}
			}),
		})
		console.log(playlistToTransfer);
		sessionStorage.setItem('playlisToTransfer', JSON.stringify(playlistToTransfer))
		history.push("/")
	}, [data, history])

	return (
		<>
			<button onClick={() => setData(playlist)} className="button-submit">Transfer this playlist</button>
		</>
	)
}
