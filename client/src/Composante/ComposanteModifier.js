import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';

class ComposanteModifier extends Component {

    emptyItem = {
        nomComposante: '',
        lesFilieres: [],
        lesGestionnaires: []
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            composantes: [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const composante = await (await fetch(`/badgeuse/composante/${this.props.match.params.id}`)).json();
        const data = await (await fetch(`/badgeuse/composante`)).json();
        this.setState({composantes: data, item: composante});
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
            const {item} = this.state;
            await fetch('/badgeuse/composante/update/?idComposante=' + item.idComposante, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/composante');
        }
    }

    checkNom(val) {
        const existe = this.state.composantes.map(composante => {
            return composante.nomComposante === val
        });
        return existe.some(item => true === item);
    }

    validate(){
        let input = this.state.item;
        let errors = {};
        let isValid = true;

        if (!input["nomComposante"]) {
            isValid = false;
            errors["nomComposante"] = "Veuillez saisir un nom";
        }

        if (this.checkNom(input["nomComposante"])) {
            isValid = false;
            errors["nomComposante"] = "Nom composante déjà utilisé";
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
                <h2>Modifier composante</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nomComposante">Nom</Label><br/>
                        <span ><i>{err.nomComposante}</i></span>
                        <Input type="text" name="nomComposante" id="nomComposante" value={item.nomComposante} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Confirmer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/composante">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ComposanteModifier);