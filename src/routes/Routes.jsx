import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROTAS from "./constants"
import Home from "../pages/Home";
import Spotify from "../Apis/Spotify"
import SpotifyImport from "../Apis/Spotify/components/Import/SpotifyImport";
import SpotifyExport from "../Apis/Spotify/components/Export/SpotifyExport";

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path={ROTAS.HOME} component={Home} />

				<Route exact path={ROTAS.SPOTIFY} component={Spotify} />
				<Route exact path={ROTAS.SPOTIFY_IMPORT} component={SpotifyImport} />
				<Route exact path={ROTAS.SPOTIFY_EXPORT} component={SpotifyExport} />
			</Switch>
		</Router>
	)
}
