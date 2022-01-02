import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Header from "./components/Header/Header";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact>
						<Index />
					</Route>
					<Route path='/gruendung'>
						<Demo />
					</Route>
					<Route path='/unternehmensregister'>
						<Demo />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
