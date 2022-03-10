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
import FiliereListe from "./Filiere/FiliereListe";
import FiliereCreer from "./Filiere/FiliereCreer";
import FiliereModifier from "./Filiere/FiliereModifier";
import ComposanteListe from './Composante/ComposanteListe';
import ComposanteCreer from "./Composante/ComposanteCreer";

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
            <Route path='/composanteListe' exact={true} component={ComposanteListe}/>
            <Route path='/composanteCreer' component={ComposanteCreer}/>
            <Route path='/composante/modifier/:id' exact={true} component={ComposanteModifier}/>
            <Route path='/filiereListe' exact={true} component={FiliereListe}/>
            <Route path='/filiereCreer' component={FiliereCreer}/>
            <Route path='/filiere/modifier/:id' exact={true} component={FiliereModifier}/>
          </Switch>
        </Router>
    )
  }
}

export default App;