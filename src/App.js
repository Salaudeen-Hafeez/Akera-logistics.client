import './App.css';
import Navbar from './Universal/Navbar';
import Banner from './Home/Banner';
import Main from './Home/Main';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './Register/Signup';
import Package from './Postpackage/Package';
import UserPage from './User/Userpage';
import PackageDetail from './User/Packagedetail';
import Admin from './Admin/Admin';

function App() {
  //const Images = "./Images2.png"
  const message = {
    packaging: 'We do the packaging',
    seal: 'We seal the package',
    transport: 'We transport the package',
    deliver: 'We deliver the package',
  };
  return (
    <Router>
      <div className="font-serif">
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Banner />
            <Main message={message} />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/addpackage">
            <Package />
          </Route>

          <Route exact path="/userpage">
            <Navbar />
            <UserPage />
          </Route>

          <Route exact path="/packagepage">
            <PackageDetail />
          </Route>

          <Route exact path="/adminpage">
            <Navbar />
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
