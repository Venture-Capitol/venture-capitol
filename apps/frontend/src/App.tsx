import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Header from "./components/Header/Header";
import Gruendung from "./pages/Gruendung/Gruendung";
import Search from "./pages/SearchDLR/DLRSearch";
import DienstleisterProfil from "./pages/Profil/subcomponents/DienstleisterProfil";
import GruendungContextProvider from "contexts/Gruendung/Gruendung";
import Impressum from "./pages/Impressum/Impressum";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung/Datenschutzerklaerung";
import Adminpanel from "./pages/Adminpanel/Adminpanel";
import Gruendung_TaskId from "./pages/Gruendung/$task";
import Profil from "./pages/Profil/Profil";

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
						<Route path='/dienstleister/admin' exact>
							<Adminpanel />
						</Route>
						<Route path='/dienstleister'>
							<Search />
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
						<Route path='/profil' exact>
							<Redirect to='/profil/gruender'></Redirect>
						</Route>
						<Route path='/profil/:platform'>
							<Profil />
						</Route>
					</Switch>
				</Router>
			</GruendungContextProvider>
		</AuthProvider>
	);
}

export default App;
