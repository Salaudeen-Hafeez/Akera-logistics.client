import { useState, useEffect } from 'react';
import Navbar from './Universal/Navbar';
import Banner from './Home/Banner';
import Logout from './Universal/Logout';
import Main from './Home/Main';
import Login from './Login/Login';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import SignUp from './Register/Signup';
import Package from './Postpackage/Package';
import UserPage from './User/Userpage';
import PackageDetail from './User/Packagedetail';
import Admin from './Admin/Admin';

function App() {
  const [userloggedIn, setUserLoggedIn] = useState(false);
  const [adminloggedIn, setAdminLoggedIn] = useState(false);
  //const [users, setUsers] = useState(null);
  const users =
    JSON.parse(localStorage.getItem('userData')) ||
    JSON.parse(localStorage.getItem('adminData'));
  useEffect(() => {
    if (users !== null) {
      if (users.user) {
        setUserLoggedIn(true);
      } else {
        setAdminLoggedIn(true);
      }
    }
  }, [users]);

  const message = {
    packaging: 'We do the packaging',
    seal: 'We seal the package',
    transport: 'We transport the package',
    deliver: 'We deliver the package',
  };
  const homeNav = ['signup', 'login'];
  const userNav = ['Profile', 'My Packages', 'Logout'];
  const adminNav = ['home', 'Users', 'Packages', 'Logout'];

  return (
    <Router>
      <div className="font-serif">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            {userloggedIn ? (
              <Redirect to="/userpage" />
            ) : adminloggedIn ? (
              <Redirect to="/adminpage" />
            ) : (
              <div>
                <Navbar linkItems={homeNav} />
                <Banner />
                <Main message={message} />
              </div>
            )}
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/addpackage">
            <Package />
          </Route>

          <Route exact path="/userpage">
            <Navbar linkItems={userNav} />
            <UserPage />
          </Route>

          <Route exact path="/packagepage">
            <PackageDetail />
          </Route>

          <Route exact path="/adminpage">
            <Navbar linkItems={adminNav} />
            <Admin />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
