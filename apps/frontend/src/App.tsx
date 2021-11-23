import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";
import Impressum from "./pages/TextPages/Impressum";
import Datenschutz from "./pages/TextPages/Datenschutz";
import PopupDisclaimer from "./components/PopupDisclaimer/PopupDisclaimer";
import DemoAuth from "./pages/Demo/DemoAuth";

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Index />
				</Route>
				<Route path='/demo'>
					<Demo />
				</Route>
				<Route path='/demoAuth'>
					<DemoAuth />
				</Route>
				<Route path='/textpages/impressum'>
					<Impressum />
				</Route>
				<Route path='/textpages/datenschutz'>
					<Datenschutz />
				</Route>
				<Route path='/popup'>
					<PopupDisclaimer />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
