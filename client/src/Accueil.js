import React, { Component } from 'react';
import './App.css';
import Menu  from './Menu';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Accueil extends Component {
    render() {
        return (
            <div>
                <Menu />
                <header className="App-header">
                    <div className="App-intro">
                        <h2>Accueil</h2>
                    </div>
                </header>
                <Container fluid>
                    <Button color="link"><Link to="/gestionnaire">Gestionnaire</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Accueil;