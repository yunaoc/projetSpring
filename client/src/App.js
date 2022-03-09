import React, { Component } from 'react';
import './App.css';
import Accueil from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VacataireListe from "./Vacataire/VacataireListe";
import VacataireCreer from "./Vacataire/VacataireCreer";
import VacataireModifier from "./Vacataire/VacataireModifier";
import CoursListe from "./Cours/CoursListe";

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
                </Switch>
            </Router>
        )
    }
}

export default App;