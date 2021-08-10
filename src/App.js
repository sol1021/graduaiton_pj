import './App.css';
import Login from './login';
import Home from './home';
import Join from './join';
import Main from './templates/main';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
       <Route path={['/@:username', '/']} exact component={Home} />
      <Route path={['/@:username', '/']} exact component={Login} />
      <Route path='/join' component={Join} />
      <Route path='/main' component={Main} />
      
    </div>
  );
}

export default App;
