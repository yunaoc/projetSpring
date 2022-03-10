import React, { Component } from 'react';
import './App.css';
import Home from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GestionnairesList from './Gestionnaire/GestionnaireListe';
import GestionnaireModifier from './Gestionnaire/GestionnaireModifier';
import GestionnaireAjouter from './Gestionnaire/GestionnaireCreer';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/gestionnaire' exact={true} component={GestionnairesList}/>
            <Route path='/gestionnaire/modifier/:id' component={GestionnaireModifier}/>
            <Route path='/gestionnaire/creer' exact={true} component={GestionnaireAjouter}/>
          </Switch>
        </Router>
    )
  }
}

export default App;