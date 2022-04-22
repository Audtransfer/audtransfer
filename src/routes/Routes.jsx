import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//PAGES
import * as ROTAS from "./constants"
import Page404 from "../pages/Page404/Page404";
import Home from "../pages/Home";
import Success from "../pages/Success";

//DEEZER
import Deezer from "../Deezer";
import DeezerExport from "../Deezer/pages/DeezerExport";
import DeezerImport from "../Deezer/pages/DeezerImport";

//SPOTIFY
import Spotify from "../Spotify"
import SpotifyExport from "../Spotify/pages/SpotifyExport";
import SpotifyImport from "../Spotify/pages/SpotifyImport";

//SPOTIFY
import Youtube from "../Youtube"
import YoutubeExport from "../Youtube/pages/YoutubeExport";
import YoutubeImport from "../Youtube/pages/YoutubeImport";

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path={ROTAS.HOME} component={Home}/>
				<Route exact path={ROTAS.SUCCESS} component={Success}/>

				<Route exact path={ROTAS.SPOTIFY} component={Spotify}/>
				<Route exact path={ROTAS.SPOTIFY_EXPORT} component={SpotifyExport}/>
				<Route exact path={ROTAS.SPOTIFY_IMPORT} component={SpotifyImport}/>

				<Route exact path={ROTAS.DEEZER} component={Deezer}/>
				<Route exact path={ROTAS.DEEZER_EXPORT} component={DeezerExport}/>
				<Route exact path={ROTAS.DEEZER_IMPORT} component={DeezerImport}/>

        <Route exact path={ROTAS.YOUTUBE} component={Youtube}/>
				<Route exact path={ROTAS.YOUTUBE_EXPORT} component={YoutubeExport}/>
				<Route exact path={ROTAS.YOUTUBE_IMPORT} component={YoutubeImport}/>
				
				<Route path="" component={Page404}/>
			</Switch>
		</Router>
	)
}
