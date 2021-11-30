import { Link } from "react-router-dom";
import "./_404.sass"

export default function Page404() {
	return (
		<div>
			<h3>Ops, something went wrong! </h3>
			<p>Error 404</p>
			<Link to="/">
				<button>Home Page</button>
			</Link>
		</div>
	)
}
