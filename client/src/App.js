import React, { Component } from 'react';
import './App.css';
import Accueil from './Accueil';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VacataireListe from './VacataireListe';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Accueil}/>
                    <Route path='/vacataireListe' exact={true} component={VacataireListe}/>
                </Switch>
            </Router>
        )
    }
}

export default App;