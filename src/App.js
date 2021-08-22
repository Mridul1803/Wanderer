import './App.css';
import AuthProvider from "./Context/AuthProvider";
import Signup from "./Component/Signup/Signup";
import Signin from "./Component/Signin/Signin";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Ioa from "./Component/Ioa";
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Feed from './Component/Feed/Feed';
import Profile from './Component/Profile/Profile'
import PrivateRoute2 from './Component/PrivateRoute2/PrivateRoute2';
function App() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<PrivateRoute exact path='/' component={Feed} />
					<Route path='/signin' component={Signin} />
					<Route path='/signup' component={Signup} />
					<PrivateRoute2 exact path='/profile' component={Profile} />
				</Switch>
			</AuthProvider>
		</Router>
		// <Ioa/>
	);
}
export default App;
