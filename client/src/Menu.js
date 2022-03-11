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
            <NavbarBrand tag={Link} to="/vacataire">Vacataires</NavbarBrand>
            <NavbarBrand tag={Link} to="/gestionnaire">Gestionnaires</NavbarBrand>
            <NavbarBrand tag={Link} to="/cours">Cours</NavbarBrand>
            <NavbarBrand tag={Link} to="composante">Composantes</NavbarBrand>
            <NavbarBrand tag={Link} to="/filiere">Filières</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
        </Navbar>;
    }
}