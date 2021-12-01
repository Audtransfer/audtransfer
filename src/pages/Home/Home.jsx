import "./_home.sass";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="home">
      <div className="wrapper">
        {!sessionStorage.getItem('playlisToTransfer') ? 
          (<p>Choose the App you want to Export:</p>) 
        : 
          (<p>Choose the App you want to Import:</p>)
        }
        <div className="options">
          <Link to="/spotify" className="spotify btn">
            Spotify
          </Link>
          <Link to="#" className="deezer btn">
            Deezer
          </Link>
          <Link to="#" className="ytMusic btn">
            YT Music
          </Link>
        </div>
      </div>
		</div>
	)
}
