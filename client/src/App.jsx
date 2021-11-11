import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HomeView from './views/Home.jsx';
import SignInView from './views/SignIn.jsx';
import SignUpView from './views/SignUp';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>PROJECT STORAGE</h1>

      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="signIn">Sign In</Link>
        <Link to="signUp">Sign Up</Link>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/signIn" component={SignInView} />
          <Route exact path="/signUp" component={SignUpView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
