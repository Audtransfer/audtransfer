export default function SpotifyImport() {
	const playlist = JSON.parse(sessionStorage.getItem('playlisToTransfer'))

	console.log(playlist);
	return (
		<div>
			importPage
		</div>
	)
}
