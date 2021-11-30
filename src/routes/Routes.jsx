import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROTAS from "./constants"
import Home from "../pages/Home";
import Success from "../pages/Success";
import Spotify from "../Spotify"
import SpotifyImport from "../Spotify/components/Import/SpotifyImport";
import SpotifyExport from "../Spotify/components/Export/SpotifyExport";
import Page404 from "../pages/Page404/Page404";

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path={ROTAS.HOME} component={Home}/>
				<Route exact path={ROTAS.SUCCESS} component={Success}/>


				<Route exact path={ROTAS.SPOTIFY} component={Spotify}/>
				<Route exact path={ROTAS.SPOTIFY_IMPORT} component={SpotifyImport}/>
				<Route exact path={ROTAS.SPOTIFY_EXPORT} component={SpotifyExport}/>


				<Route path="" component={Page404}/>
			</Switch>
		</Router>
	)
}
