import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';
import bcrypt from "bcryptjs";

class VacataireModifier extends Component {

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
            item: this.emptyItem,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const vacataire = await (await fetch(`/badgeuse/vacataire/${this.props.match.params.id}`)).json();
        vacataire.motDePasse=null;
        this.setState({item: vacataire});
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

        if(this.validate()) {
            this.state.item["motDePasse"] = bcrypt.hashSync(this.state.item["motDePasse"], '$2a$10$81C0NmOGFacMZsWp20poXO');
            const {item} = this.state;
            await fetch('/badgeuse/vacataire/update/?id=' + item.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/vacataireListe');
        }
    }

    validate(){
        let input = this.state.item;
        let errors = {};
        let isValid = true;

        if (typeof input["mail"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["mail"])) {
                isValid = false;
                errors["mail"] = "Saisir une adresse mail valide";
            }
        }

        if (!input["motDePasse"] && input["motDePasse2"] ) {
            isValid = false;
            errors["motDePasse"] = "Saisir un mot de passe";
        }

        if (input["motDePasse"]){

            if (!input["motDePasse2"]) {
                isValid = false;
                errors["motDePasse2"] = "Confirmer le mot de passe";
            }

            if (input["motDePasse"] !== input["motDePasse2"]) {
                isValid = false;
                errors["motDePasse"] = "Les mots de passe sont différents";
            }
        }


        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        const {item} = this.state;
        const err = this.state.errors;

        return <div>
            <Menu/>
            <Container>
                <h2>Modifier vacataire</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="nomUsuel">Nom</Label>
                            <Input type="text" name="nomUsuel" id="nomUsuel" value={item.nomUsuel}
                                   onChange={this.handleChange} autoComplete="nomUsuel"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="prenom">Prenom</Label>
                            <Input type="text" name="prenom" id="prenom" value={item.prenom}
                                   onChange={this.handleChange} autoComplete="prenom"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="mail">Email</Label><br/>
                        <span >{err.mail}</span>
                        <Input type="text" name="mail" id="mail" value={item.mail}
                               onChange={this.handleChange} autoComplete="mail"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="login">Login : {item.login}</Label>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse">Nouveau mot de passe</Label><br/>
                            <span >{err.motDePasse}</span>
                            <Input type="password" name="motDePasse" id="motDePasse" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse2">Confirmation du mot de passe</Label><br/>
                            <span >{err.motDePasse2}</span>
                            <Input type="password" name="motDePasse2" id="motDePasse2" onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Button color="primary" type="submit">Valider</Button>{' '}
                        <Button color="secondary" tag={Link} to="/vacataireListe">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(VacataireModifier);