// Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import SpotifyProvider from "./contexts/Spotify";
import DeezerProvider from "./contexts/Deezer";
import YoutubeProvider from "./contexts/Youtube";

// Routes and Contexts Providers
import Routes from "./routes/Routes";

export default function App() {
  return (
    <>
      <Header />
      <main className="site-body">
        <SpotifyProvider>
          <DeezerProvider>
            <YoutubeProvider>
              <Routes />
            </YoutubeProvider>
          </DeezerProvider>
        </SpotifyProvider>
      </main>
      <Footer />
    </>
  );
}
