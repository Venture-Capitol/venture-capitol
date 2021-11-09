import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";

function App() {
	return (
		<AuthProvider>
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
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
