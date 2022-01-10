import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Gruendung from "./pages/Gruendung/Gruendung";
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
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
