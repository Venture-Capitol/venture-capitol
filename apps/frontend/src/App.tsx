import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Header from "./components/Header/Header";
import Gruendung from "./pages/Gruendung/Gruendung";
import Search from "./pages/Search/DLRSearch";
import CreateEntryPage from "./pages/CreateDienstleisterPage/CreateDienstleisterPage";
import GetEntryPage from "./pages/GetDienstleisterPage/GetDienstleisterPage";
import GruendungContextProvider from "contexts/Gruendung/Gruendung";
import Gesellschaftsform from "./pages/GesellschaftsformDecisionPage/GesellschaftsformDecision";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung/Datenschutzerklaerung";
import Impressum from "./pages/Impressum/Impressum";
import Gruendung_TaskId from "./pages/Gruendung/$task";

function App() {
	return (
		<AuthProvider>
			<GruendungContextProvider>
				<Router>
					<Header />
					<Switch>
						<Route path='/' exact>
							<Index />
						</Route>
						<Route path='/gruendung' exact>
							<Gruendung />
						</Route>
						<Route path='/gruendung/:task'>
							<Gruendung_TaskId />
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
						<Route path='/gesellschaftsform'>
							<Gesellschaftsform />
						</Route>
					</Switch>
				</Router>
			</GruendungContextProvider>
		</AuthProvider>
	);
}

export default App;
