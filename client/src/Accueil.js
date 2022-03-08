import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Accueil extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Container fluid>
                    <Button color="link"><Link to="/vacataireListe">autre</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Accueil;