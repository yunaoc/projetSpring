import React, { Component } from 'react';
import './App.css';
import Menu from "./Menu";

class VacataireListe extends Component {
    state = {
        isLoading: true,
        vacataires: []
    };

    async componentDidMount() {
        const response = await fetch('/badgeuse/vacataire/');
        const body = await response.json();
        this.setState({ vacataires: body, isLoading: false });
    }

    render() {
        const {vacataires, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="App">
                <Menu/>
                <header className="App-header">
                    <div className="App-intro">
                        <h2>Liste des vacataires</h2>
                        {vacataires.map(vacataire =>
                            <div key={vacataire.id}>
                                {vacataire.nomUsuel} {vacataire.prenom}
                            </div>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}

export default VacataireListe;
