import { Link } from "react-router-dom";
import { useTransferContext } from "../../contexts/Transfer";

export default function Home() {
	const { dataTransfer } = useTransferContext();

	return (
		<div className="home">
      <div className="wrapper">
				<p>Choose the App you want to 
					{
						dataTransfer === null ? " Export:" : " Import:"
					}
				</p>
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
