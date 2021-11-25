import "./App.sass";
import Routes from "./routes/Routes";
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="site">
			<div className="site-header">
				<Header />
			</div>
			<div className="site-body">
      	<Routes />
			</div>
			<div className="site-footer">
				<Footer />
			</div>
    </div>
  );
}
