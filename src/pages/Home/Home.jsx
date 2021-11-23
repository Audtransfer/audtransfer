import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<h1>Audtransfer</h1>
			
			{!sessionStorage.getItem('playlisToTransfer') ? 
				(<p>Choose the App you want to Export:</p>) 
			: 
				(<p>Choose the App you want to Import:</p>)
			}
			<Link to="/spotify">
				<button>Spotify</button>
			</Link>
			{/* <Link to="/deezer">
				<button>Deezer</button>
			</Link>
			<Link to="/ytmusic">
				<button>YT music</button>
			</Link> */}
		</div>
	)
}
