import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Header from "./components/Header/Header";
import Gruendung from "./pages/Gruendung/Gruendung";
import GruendungAuswahl from "./pages/Gruendung/GruendungAuswahl";
import Search from "./pages/Search/DLRSearch";
import CreateEntryPage from "./pages/CreateDienstleisterPage/CreateDienstleisterPage";
import GetEntryPage from "./pages/GetDienstleisterPage/GetDienstleisterPage";
import GruendungContextProvider from "contexts/Gruendung/Gruendung";
import Impressum from "./pages/Impressum/Impressum";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung/Datenschutzerklaerung";

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
						<GruendungAuswahl />
					</Route>
					<Route path='/gruendung/:task'>
						<GruendungContextProvider>
							<Gruendung />
						</GruendungContextProvider>
					</Route>
					<Route path='/dienstleister'>
						<Index />
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
					<Route path='/demoAuth'>
						<DemoAuth />
					</Route>
					<Route path='/impressum'>
						<Impressum />
					</Route>
					<Route path='/datenschutz'>
						<Datenschutzerklaerung />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
