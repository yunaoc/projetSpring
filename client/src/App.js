import React, { Component } from 'react';
import './App.css';
import Home from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GestionnairesList from './Gestionnaire/GestionnaireListe';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/gestionnaire' exact={true} component={GestionnairesList}/>
          </Switch>
        </Router>
    )
  }
}

export default App;