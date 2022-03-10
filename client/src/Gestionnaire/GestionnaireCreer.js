import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label

} from 'reactstrap';
import Menu from '../Menu';
import bcrypt from 'bcryptjs'

class GestionnaireCreer extends Component {

    emptyItem = {
        login: '',
        nomUsuel: '',
        prenom: '',
        motDePasse: '',
        mail: '',
        maComposante: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            isLoading: true,
            composantes: [],
            gestionnaires : [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            const id = item.maComposante;
            delete item.maComposante;
            await fetch('/badgeuse/gestionnaire/?id=' + id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/gestionnaire');

        }
    }

    async componentDidMount() {
        const response1 = await (await fetch('/badgeuse/composante/')).json();
        const response2 = await (await fetch(`/badgeuse/gestionnaire/`)).json();
        this.setState({ gestionnaires: response2, composantes: response1, isLoading: false });
    }

    checkMail(val) {
        const existe = this.state.gestionnaires.map(gestionnaire => {
            return gestionnaire.mail === val
        });
        return existe.some(item => true === item);
    }

    checkLogin(val) {
        const existe = this.state.gestionnaires.map(gestionnaire => {
            return gestionnaire.login === val
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
        if (typeof input["mail"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["mail"])) {
                isValid = false;
                errors["mail"] = "Saisir une adresse mail valide";
            }
        }
        if (!input["login"]) {
            isValid = false;
            errors["login"] = "Saisir un login";
        }
        if (input["maComposante"] === 0 || input["maComposante"] === '0' ) {
            isValid = false;
            errors["maComposante"] = "Selectionner une composante";
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

        if (this.checkMail(input["mail"])) {
            isValid = false;
            errors["mail"] = "Adresse mail déjà utilisée";
        }

        if (this.checkLogin(input["login"])) {
            isValid = false;
            errors["login"] = "Pseudo déjà utilisé";
        }

        this.setState({
            errors: errors
        });
        return isValid;
    }

    render() {
        const {composantes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const err = this.state.errors;
        return <div>
            <Menu/>
            <Container>
                <p/>
                <h2>Créer Gestionnaire</h2>
                <p/>
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
                        <Label for="maComposante">Composante :</Label><br/>
                        <span >{err.maComposante}</span>
                        <p/>
                        <select name="maComposante" onChange={this.handleChange}>
                            <option key="0" value="0">Selectionner une composante</option>
                            {composantes.map(composante => (
                                <option key={composante.idComposante} value={composante.idComposante}>
                                    {composante.nomComposante}
                                </option>

                            ))}
                        </select>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/gestionnaire">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(GestionnaireCreer);