// Components
import Header from "./components/Header"
import Footer from "./components/Footer"

// Routes and Contexts Providers
import Routes from "./routes/Routes";
import SpotifyProvider from "./contexts/Spotify";

export default function App() {
  return (
    <>
      <Header />
				<main className="site-body">
					<SpotifyProvider>
						<Routes />
					</SpotifyProvider>
				</main>
      <Footer />
    </>
  );
}
