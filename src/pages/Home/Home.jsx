import { Link } from "react-router-dom";
import spotify from "../../assets/spotify.png"
import deezer from "../../assets/deezer.png"
import youtube from "../../assets/youtube.png"

export default function Home() {
  const dataTransfer = sessionStorage.getItem('playlisToTransfer');

  return (
    <div className="home">
      <div className="wrapper">
        <div className="home-intro">
          <p className="home-intro__title">Transfer Playlists between Music Streaming Platforms</p>

          <div className="home-intro__player">
            <svg width="441" height="73" viewBox="0 0 441 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M424.25 30.6781C428.583 33.1799 428.583 39.4345 424.25 41.9364L399.789 56.0589C395.456 58.5607 390.039 55.4334 390.039 50.4297L390.039 22.1847C390.039 17.181 395.456 14.0537 399.789 16.5556L424.25 30.6781Z" fill="white" stroke="#742B97" stroke-width="7" />
              <circle cx="284.259" cy="36.3072" r="4.42771" fill="#742B97" />
              <circle cx="312.596" cy="36.3072" r="4.42771" fill="#742B97" />
              <circle cx="340.934" cy="36.3072" r="4.42771" fill="#742B97" />
              <path d="M240.057 30.6781C244.391 33.1799 244.391 39.4345 240.057 41.9364L215.596 56.0589C211.263 58.5607 205.846 55.4334 205.846 50.4297L205.846 22.1847C205.846 17.181 211.263 14.0537 215.596 16.5556L240.057 30.6781Z" fill="white" stroke="#742B97" stroke-width="7" />
              <circle cx="100.066" cy="36.3072" r="4.42771" fill="#742B97" />
              <circle cx="128.404" cy="36.3072" r="4.42771" fill="#742B97" />
              <circle cx="156.741" cy="36.3072" r="4.42771" fill="#742B97" />
              <path d="M55.8645 30.6781C60.1978 33.1799 60.1978 39.4345 55.8645 41.9364L31.4036 56.0589C27.0703 58.5607 21.6536 55.4334 21.6536 50.4297L21.6536 22.1847C21.6536 17.181 27.0703 14.0537 31.4036 16.5556L55.8645 30.6781Z" fill="#1B1A20" stroke="#742B97" stroke-width="7" />
            </svg>
          </div>

          <p className="home-intro__escolha">
            Pick the platform to transfer
            {
              dataTransfer === null ? " from" : " to"
            }
            :
          </p>

          <p className="home-intro__escolha-descricao">
            {
              dataTransfer === null ? "You must choose the platform where your playlist is located" : "You must choose the platform to where you want to transfer your playlist"
            }
          </p>
        </div>
        <div className="options">
          <Link to="/spotify" className="spotify btn">
            <img className="nameLogo" src={spotify} alt="Logo Spotify" />
          </Link>
          <Link to="/deezer" className="deezer btn">
            <img className="nameLogo" src={deezer} alt="Logo Deezer" />
          </Link>
          <Link to="/youtube" className="ytMusic btn">
            <img className="nameLogo" src={youtube} alt="Logo Youtube" />
          </Link>
        </div>
      </div>
    </div>
  )
}
