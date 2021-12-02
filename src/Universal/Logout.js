import { Route, Redirect } from 'react-router-dom';
const Logout = () => {
  localStorage.clear();
  return (
    <Route exact path="/Logout">
      <Redirect to={'/'}></Redirect>
    </Route>
  );
};

export default Logout;
