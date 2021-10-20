import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<Index />
				</Route>
				<Route path='/demo'>
					<Demo />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
