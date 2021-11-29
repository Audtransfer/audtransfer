import "./_home.sass";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="homepage">
			{!sessionStorage.getItem('playlisToTransfer') ? 
				(<p>Choose the App you want to Export:</p>) 
			: 
				(<p>Choose the App you want to Import:</p>)
			}
			<div className="options">
				<Link to="/spotify" className="spotify">
					Spotify
				</Link>
				<Link to="#" className="deezer">
					Deezer
				</Link>
				<Link to="#" className="ytMusic">
					YT Music
				</Link>
			</div>
		</div>
	)
}
