import React, { Component } from 'react';
import './App.css';
import Accueil from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VacataireListe from "./Vacataire/VacataireListe";
import VacataireCreer from "./Vacataire/VacataireCreer";


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Accueil}/>
                    <Route path='/vacataireListe' exact={true} component={VacataireListe}/>
                    <Route path='/vacataireCreer' component={VacataireCreer}/>
                </Switch>
            </Router>
        )
    }
}

export default App;