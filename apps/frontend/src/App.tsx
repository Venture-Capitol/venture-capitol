import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "@vc/auth";
import Demo from "./pages/Demo/Demo";
import Index from "./pages/Index/Index";
import DemoAuth from "./pages/Demo/DemoAuth";
import Gruendung from "./pages/Gruendung/Gruendung";

import Search from "./pages/Search/UTRSearch";
import CreateEntryPage from "./pages/CreateEntryPage/CreateEntryPage";
import GetEntryPage from "./pages/GetEntryPage/GetEntryPage";
// import DemoAsyncContent from "./pages/Demo/DemoAsyncContent";
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
					<Route path='/utr/search'>
						<Search />
					</Route>
					<Route path='/utr/createEntry'>
						<CreateEntryPage />
					</Route>
					<Route path='/utr/demo/getEntry'>
						<GetEntryPage />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
