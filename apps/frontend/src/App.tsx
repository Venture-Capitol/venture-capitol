import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Header from "./components/Header/Header";
import Gruendung from "./pages/Gruendung/Gruendung";
import Search from "./pages/SearchDLR/DLRSearch";
import DienstleisterProfil from "./pages/DienstleisterProfil/DienstleisterProfil";
import GetEntryPage from "./pages/GetDienstleisterPage/GetDienstleisterPage";
import GruendungContextProvider from "contexts/Gruendung/Gruendung";
import Impressum from "./pages/Impressum/Impressum";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung/Datenschutzerklaerung";
import Adminpannel from "./pages/Adminpannel/Adminpannel";

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
						<Index />
					</Route>
					<Route path='/gruendung/:task'>
						<GruendungContextProvider>
							<Gruendung />
						</GruendungContextProvider>
					</Route>
					<Route path='/dienstleister/admin' exact>
						<Adminpannel />
					</Route>
					<Route path='/dienstleister'>
						<Search />
					</Route>
					<Route path='/profil/dienstleister'>
						<DienstleisterProfil />
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
