// Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import SpotifyProvider from "./contexts/Spotify";
import DeezerProvider from "./contexts/Deezer";

// Routes and Contexts Providers
import Routes from "./routes/Routes";

export default function App() {
  return (
    <>
      <Header />
			<main className="site-body">
				<SpotifyProvider>
					<DeezerProvider>
      			<Routes />
					</DeezerProvider>
				</SpotifyProvider>
			</main>
      <Footer />
    </>
  );
}
