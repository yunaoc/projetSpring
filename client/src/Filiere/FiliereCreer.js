import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';
import axios from "axios";
import Select from "react-select";

class FiliereCreer extends Component {

    emptyItem = {
        nomFiliere: '',
        codeFiliere: '',
        maComposante: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            selectOptions: [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleComposanteChange = this.handleComposanteChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await this.getOptions();
    }

    handleChange(event) {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;

        this.setState({item});
    }

    handleComposanteChange(event) {
        const value = event.value;
        let item = {...this.state.item};
        item.maComposante = value;

        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();

        if(this.validate()) {
            const item = {
                "nomFiliere": this.state.item.nomFiliere,
                "codeFiliere" : this.state.item.codeFiliere
            };
            await fetch('/badgeuse/filiere/?idComposante='+ this.state.item.maComposante, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/filiere');
        }
    }

    validate(){
        let input = this.state.item;
        let errors = {};
        let isValid = true;

        if (!input["nomFiliere"]) {
            isValid = false;
            errors["nomFiliere"] = "Veuillez saisir un nom";
        }

        if (!input["codeFiliere"]) {
            isValid = false;
            errors["codeFiliere"] = "Veuillez saisir un code";
        }

        if (!input["maComposante"]) {
            isValid = false;
            errors["maComposante"] = "Veuillez saisir une composante";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    async getOptions(){
        const res = await axios.get('/badgeuse/composante');
        let data = res.data;

        const options = data.map(d => ({
            "value" : d.idComposante,
            "label" : d.idComposante +" - "+ d.nomComposante
        }));

        this.setState({selectOptions: options});
    }

    render() {
        const err = this.state.errors;

        return <div>
            <Menu/>
            <Container>
                <h2>Créer filière</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="nomFiliere">Nom</Label><br/>
                            <span ><i>{err.nomFiliere}</i></span>
                            <Input type="text" name="nomFiliere" id="nomFiliere" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="codeFiliere">Code</Label><br/>
                            <span ><i>{err.codeFiliere}</i></span>
                            <Input type="text" name="codeFiliere" id="codeFiliere" onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="row">
                    <FormGroup className="col-md-10 mb-6">
                        <Label for="maComposante">Composante</Label><br/>
                        <span ><i>{err.maComposante}</i></span>
                        <Select options={this.state.selectOptions} onChange={this.handleComposanteChange}/>
                    </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Enregistrer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/filiere">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(FiliereCreer);