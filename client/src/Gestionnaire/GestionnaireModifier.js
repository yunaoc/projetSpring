import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';

class GestionnaireModifier extends Component {

    emptyItem = {
        nomUsuel: '',
        prenom: '',
        mail: '',
        login: '',
        motDePasse: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const gestionnaire = await (await fetch(`/badgeuse/gestionnaire/${this.props.match.params.id}`)).json();
        this.setState({item: gestionnaire});
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/badgeuse/gestionnaire/?id=' + item.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/gestionnaire');
    }

    render() {
        const {item} = this.state;

        return <div>
            <Menu/>
            <Container>
                <h2>Modifier gestionnaire</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nomUsuel">Nom</Label>
                        <Input type="text" name="nomUsuel" id="nomUsuel" value={item.nomUsuel || ''}
                               onChange={this.handleChange} autoComplete="nomUsuel"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="prenom">Prenom</Label>
                        <Input type="text" name="prenom" id="prenom" value={item.prenom || ''}
                               onChange={this.handleChange} autoComplete="prenom"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="mail">Email</Label>
                        <Input type="text" name="mail" id="mail" value={item.mail || ''}
                               onChange={this.handleChange} autoComplete="mail"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="login">Pseudo</Label>
                        <Input type="text" name="login" id="login" value={item.login || ''}
                               onChange={this.handleChange} autoComplete="login"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="motDePasse">Mot de passe</Label>
                        <Input type="text" name="motDePasse" id="motDePasse" value={item.motDePasse || ''}
                               onChange={this.handleChange} autoComplete="motDePasse"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Valider</Button>{' '}
                        <Button color="secondary" tag={Link} to="/gestionnaire">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(GestionnaireModifier);