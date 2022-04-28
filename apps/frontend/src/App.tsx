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
import GruendungContextProvider from "contexts/Gruendung/Gruendung";
import Gesellschaftsform from "./pages/GesellschaftsformDecisionPage/GesellschaftsformDecision";
import Datenschutzerklaerung from "./pages/Datenschutzerklaerung/Datenschutzerklaerung";
import Impressum from "./pages/Impressum/Impressum";
import Adminpanel from "./pages/Adminpanel/Adminpanel";
import Gruendung_TaskId from "./pages/Gruendung/$task";
import Profil from "./pages/Profil/Profil";
import MdxPage from "./pages/MDX/Mdx";
import mixpanel from "mixpanel-browser";
import LegalFormFinder from "./pages/LegalFormFinder/LegalFormFinder";

function App() {
	return (
		<AuthProvider
			onAuthStateChanged={user => {
				if (user?.uid) mixpanel.identify(user.uid);
			}}
		>
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
						<Route path='/gesellschaftsform'>
							<Gesellschaftsform />
						</Route>
						<Route path='/gesellschaftsform-finder'>
							<LegalFormFinder />
						</Route>
						<Route path='/profil' exact>
							<Redirect to='/profil/gruender'></Redirect>
						</Route>
						<Route path='/profil/:platform'>
							<Profil />
						</Route>
						<Route path='/mdx'>
							<MdxPage />
						</Route>
					</Switch>
				</Router>
			</GruendungContextProvider>
		</AuthProvider>
	);
}

export default App;
