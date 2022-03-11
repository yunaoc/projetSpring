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
            item: this.emptyItem,
            vacataires : [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const vacataires = await (await fetch(`/badgeuse/vacataire/`)).json();
        this.setState({vacataires: vacataires});
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
            await fetch('/badgeuse/vacataire', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/vacataire');
        }
    }

    checkMail(val) {
        const existe = this.state.vacataires.map(vacataire => {
            return vacataire.mail === val
        });
        return existe.some(item => true === item);
    }

    checkLogin(val) {
        const existe = this.state.vacataires.map(vacataire => {
            return vacataire.login === val
        });
        return existe.some(item => true === item);
    }

    validate(){

        let input = this.state.item;
        let errors = {};
        let isValid = true;

        if (!input["nomUsuel"]) {
            isValid = false;
            errors["nomUsuel"] = "Saisir un nom";
        }

        if (!input["prenom"]) {
            isValid = false;
            errors["prenom"] = "Saisir un prénom";
        }

        if (!input["mail"]) {
            isValid = false;
            errors["mail"] = "Saisir une adresse mail";
        }

        if (this.checkMail(input["mail"])) {
            isValid = false;
            errors["mail"] = "Adresse mail déjà utilisée";
        }

        if (typeof input["mail"] !== "undefined") {

            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["mail"])) {
                isValid = false;
                errors["mail"] = "Saisir une adresse mail valide";
            }
        }

        if (!input["login"]) {
            isValid = false;
            errors["login"] = "Saisir un login";
        }

        if (this.checkLogin(input["login"])) {
            isValid = false;
            errors["login"] = "Pseudo déjà utilisé";
        }

        if (!input["motDePasse"]) {
            isValid = false;
            errors["motDePasse"] = "Saisir un mot de passe";
        }

        if (!input["motDePasse2"]) {
            isValid = false;
            errors["motDePasse2"] = "Confirmer le mot de passe";
        }

        if (input["motDePasse"] !== input["motDePasse2"]) {
            isValid = false;
            errors["motDePasse"] = "Les mots de passe sont différents";
        }


        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        const err = this.state.errors;
        return <div>
            <Menu/>
            <Container>
                <h2>Créer vacataire</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="nomUsuel">Nom</Label><br/>
                            <span >{err.nomUsuel}</span>
                            <Input type="text" name="nomUsuel" id="nomUsuel" onChange={this.handleChange} autoComplete="family-name"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="prenom">Prénom</Label><br/>
                            <span >{err.prenom}</span>
                            <Input type="text" name="prenom" id="prenom" onChange={this.handleChange} autoComplete="given-name"/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="mail">Email</Label><br/>
                        <span >{err.mail}</span>
                        <Input type="text" name="mail" id="mail" onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="login">Login</Label><br/>
                        <span >{err.login}</span>
                        <Input type="text" name="login" id="login" onChange={this.handleChange}/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse">Mot de passe</Label><br/>
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
                        <Button color="primary" type="submit">Confirmer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/vacataire">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(VacataireCreer);