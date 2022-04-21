import Routes from "./routes/Routes";
import Header from "./components/Header"
import Footer from "./components/Footer"
import SpotifyProvider from "./contexts/Spotify";
import DeezerProvider from "./contexts/Deezer";

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
