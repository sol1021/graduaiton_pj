import './App.css';
import Login from './login';
import Home from './home';
import Join from './join';
import Main from './main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/join' component={Join} />
      <div>
       <Route path={['/@:username', '/']} exact component={Home} />
       <Route path='/main' component={Main} />
       <Route path='/mypage' component={() => { 
     window.location.href = 'http://127.0.0.1:5000/mypage'; 
     return null;
}}/>
      <Footer />
      </div>
    </Switch>
    </Router>
  );
}

export default App;
