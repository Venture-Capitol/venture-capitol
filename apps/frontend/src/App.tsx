import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Header from "./components/Header/Header";
import Gruendung from "./pages/Gruendung/Gruendung";
import GruendungContextProvider from "contexts/Gruendung/Gruendung";
import Search from "./pages/Search/UTRSearch";
import Demo from "./pages/Demo/Demo";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact>
						<Index />
					</Route>
					<Route path='/gruendung' exact>
						<Demo />
					</Route>
					<Route path='/dienstleister'>
						<Demo />
					</Route>
					<Route path='/demoAuth'>
						<DemoAuth />
					</Route>
					<Route path='/gruendung/:task'>
						<GruendungContextProvider>
							<Gruendung />
						</GruendungContextProvider>
					</Route>
					<Route path='/demoutr'>
						<Search />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
