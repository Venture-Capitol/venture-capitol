import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Gruendung from "./pages/Gruendung/Gruendung";
import DemoAsyncContent from "./pages/Demo/DemoAsyncContent";
import ProcessProvider from "./components/ProcessContext/ProcessContext";

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
						<ProcessProvider>
							<Gruendung />
						</ProcessProvider>
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
