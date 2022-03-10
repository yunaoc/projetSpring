import React, { Component } from 'react';
import './App.css';
import Accueil from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ComposanteListe from './Composante/ComposanteListe';
import ComposanteCreer from "./Composante/ComposanteCreer";
import VacataireListe from "./Vacataire/VacataireListe";
import VacataireCreer from "./Vacataire/VacataireCreer";
import GestionnaireListe from "./Gestionnaire/GestionnaireListe";
import ComposanteModifier from "./Composante/ComposanteModifier";
import GestionnaireModifier from "./Gestionnaire/GestionnaireModifier";
import VacataireModifier from "./Vacataire/VacataireModifier";
import FiliereListe from "./Filiere/FiliereListe";
import FiliereCreer from "./Filiere/FiliereCreer";
import FiliereModifier from "./Filiere/FiliereModifier";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Accueil}/>
                    <Route path='/gestionnaireListe' exact={true} component={GestionnaireListe}/>
                    <Route path='/gestionnaire/modifier/:id' exact={true} component={GestionnaireModifier}/>
                    <Route path='/vacataireListe' exact={true} component={VacataireListe}/>
                    <Route path='/vacataireCreer' component={VacataireCreer}/>
                    <Route path='/vacataire/modifier/:id' exact={true} component={VacataireModifier}/>
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