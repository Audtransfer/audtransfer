import Routes from "./routes/Routes";
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <Header />
			<main className="site-body">
      	<Routes />
			</main>
      <Footer />
    </>
  );
}
