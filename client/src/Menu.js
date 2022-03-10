import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Accueil</NavbarBrand>
            <NavbarBrand tag={Link} to="/vacataireListe">Vacataires</NavbarBrand>
            <NavbarBrand tag={Link} to="/gestionnaire">Liste Gestionnaire</NavbarBrand>
            <NavbarBrand tag={Link} to="/coursListe">Cours</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
        </Navbar>;
    }
}