import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Saved from './components/Saved';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
        </Switch>
      </div>
      <div className="socket-msg hide">
        <h4>A new book has been saved:</h4>
        <p></p>
      </div>
    </Router>
  );
}


export default App;
