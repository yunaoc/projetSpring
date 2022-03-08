import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';
import bcrypt from 'bcryptjs'

class VacataireCreer extends Component {

    emptyItem = {
        login: '',
        nomUsuel: '',
        prenom: '',
        motDePasse: '',
        mail: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        if([name].toString() === "motDePasse")
            item[name] = bcrypt.hashSync(value, '$2a$10$81C0NmOGFacMZsWp20poXO');
        else
            item[name] = value;

        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        await fetch('/badgeuse/vacataire', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/vacataireListe');
    }

    render() {

        return <div>
            <Menu/>
            <Container>
                <h2>Créer vacataire</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="nomUsuel">Nom</Label>
                            <Input type="text" name="nomUsuel" id="nomUsuel" onChange={this.handleChange} autoComplete="family-name"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="prenom">Prénom</Label>
                            <Input type="text" name="prenom" id="prenom" onChange={this.handleChange} autoComplete="given-name"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="mail">Email</Label>
                        <Input type="text" name="mail" id="mail" onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login" onChange={this.handleChange}/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse">Mot de passe</Label>
                            <Input type="password" name="motDePasse" id="motDePasse" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse2">Confirmation du mot de passe</Label>
                            <Input type="password" name="motDePasse2" id="motDePasse2" onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/vacataireListe">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(VacataireCreer);