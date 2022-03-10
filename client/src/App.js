import React, { Component } from 'react';
import './App.css';
import Accueil from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GestionnairesList from './Gestionnaire/GestionnaireListe';
import GestionnaireModifier from './Gestionnaire/GestionnaireModifier';
import GestionnaireAjouter from './Gestionnaire/GestionnaireCreer';
import VacataireListe from "./Vacataire/VacataireListe";
import VacataireCreer from "./Vacataire/VacataireCreer";
import VacataireModifier from "./Vacataire/VacataireModifier";
import CoursListe from "./Cours/CoursListe";
import CoursModifier from "./Cours/CoursModifier";
import CoursCreer from "./Cours/CoursCreer";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Accueil}/>
            <Route path='/vacataireListe' exact={true} component={VacataireListe}/>
            <Route path='/vacataireCreer' exact={true} component={VacataireCreer}/>
            <Route path='/vacataireModifier/:id' exact={true} component={VacataireModifier}/>
            <Route path='/coursListe' exact={true} component={CoursListe}/>
            <Route path='/coursCreer' exact={true} component={CoursCreer}/>
            <Route path='/coursModifier/:id' exact={true} component={CoursModifier}/>
            <Route path='/gestionnaire' exact={true} component={GestionnairesList}/>
            <Route path='/gestionnaire/modifier/:id' component={GestionnaireModifier}/>
            <Route path='/gestionnaire/creer' exact={true} component={GestionnaireAjouter}/>
          </Switch>
        </Router>
    )
  }
}

export default App;