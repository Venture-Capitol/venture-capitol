import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Gruendung from "./pages/Gruendung/Gruendung";

// Dienstleister Pages
import Search from "./pages/Search/UTRSearch";
import CreateEntryPage from "./pages/CreateEntryPage/CreateEntryPage";
import GetEntryPage from "./pages/GetEntryPage/GetEntryPage";
import ProcessProvider from "./components/ProcessContext/ProcessContext";
import GruendungContextProvider from "contexts/Gruendung/Gruendung";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Route path='/' exact>
						<Index />
					</Route>
					<Route path='/demoAuth'>
						<DemoAuth />
					</Route>
					<Route path='/gruendung/:task'>
						<GruendungContextProvider>
							<Gruendung />
						</GruendungContextProvider>
					</Route>
					<Route path='/dienstleister/search'>
						<Search />
					</Route>
					<Route path='/dienstleister/create'>
						<CreateEntryPage />
					</Route>
					<Route path='/dienstleister/get'>
						<GetEntryPage />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
