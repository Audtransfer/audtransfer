import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//PAGES
import * as ROTAS from "./constants"
import Page404 from "../pages/Page404/Page404";
import Home from "../pages/Home";
import Success from "../pages/Success";

//CONTEXTS
import SpotifyProvider from "../contexts/Spotify";

//SPOTIFY
import Spotify from "../Spotify"
import SpotifyExport from "../Spotify/pages/SpotifyExport";
import SpotifyImport from "../Spotify/pages/SpotifyImport";

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path={ROTAS.HOME} component={Home}/>
				<Route exact path={ROTAS.SUCCESS} component={Success}/>

				<SpotifyProvider>
					<Route exact path={ROTAS.SPOTIFY} component={Spotify}/>
					<Route exact path={ROTAS.SPOTIFY_EXPORT} component={SpotifyExport}/>
					<Route exact path={ROTAS.SPOTIFY_IMPORT} component={SpotifyImport}/>
				</SpotifyProvider>
				
				<Route path="" component={Page404}/>
			</Switch>
		</Router>
	)
}
