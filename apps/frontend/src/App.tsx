import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Content from "./components/Content/Content";
import DemoAsyncContent from "./pages/Demo/DemoAsyncContent";

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
					<Route path='/content' exact component={DemoAsyncContent} />
					<Route path='/content/:id' component={Content}></Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
