import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import Menu from '../Menu';

class CoursModifier extends Component {

    emptyItem = {
        intitule: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            lesVacataires : [],
            lesFilieres : [],
            choixFilieres: [],
            choixVacataires: [],
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const cours = await (await fetch(`/badgeuse/cours/${this.props.match.params.id}`)).json();
        const filieres = await (await fetch(`/badgeuse/filiere/`)).json();
        const vacataires = await (await fetch(`/badgeuse/vacataire/`)).json();
        this.setState({item: cours});
        this.setState({lesFilieres: filieres});
        this.setState({lesVacataires: vacataires});
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
            await fetch('/badgeuse/cours/update/?idCours=' + item.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/cours');
        }
    }

    validate(){
        let errors = {};
        let isValid = true;

        if (!this.state.item["intitule"]) {
            isValid = false;
            errors["intitule"] = "Saisir un intitulé";
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }

    async addFiliere(id) {
        const {item} = this.state;
        await fetch(`../badgeuse/cours/addFiliere/?idCours=${item.id}&idFiliere=${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const cours = await (await fetch(`/badgeuse/cours/${this.props.match.params.id}`)).json();
        this.setState({item: cours});
    }

    async removeFiliere(id) {
        await fetch(`../badgeuse/cours/removeFiliere/?idCours=${this.state.item.id}&idFiliere=${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const cours = await (await fetch(`/badgeuse/cours/${this.props.match.params.id}`)).json();
        this.setState({item: cours});
    }

    checkFiliere(val) {
        const existe = this.state.item.lesFilieres.map(filiere => {
            return filiere.idFiliere === val
        });
        return existe.some(item => true === item);
    }

    render() {
        const {item} = this.state;
        const err = this.state.errors;
        const filieres = this.state.lesFilieres.map(filiere => {
            if(this.checkFiliere(filiere.idFiliere))
                return <tr>
                    <td>{filiere.nomFiliere}</td>
                    <td><Button size="sm" color="danger" onClick={() => this.removeFiliere(filiere.idFiliere)}>Enlever</Button></td>
                </tr>
            else
                return <tr>
                    <td>{filiere.nomFiliere}</td>
                    <td><Button size="sm" onClick={() => this.addFiliere(filiere.idFiliere)}>Ajouter</Button></td>
                </tr>
        });
        return <div>
            <Menu/>
            <Container>
                <h2>Modifier cours</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="intitule">Intitulé</Label><br/>
                        <span >{err.intitule}</span>
                        <Input type="text" name="intitule" id="intitule" value={item.intitule} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Confirmer</Button>{' '}
                    </FormGroup>
                </Form>
                <div>
                    <h4>Filières</h4>
                    <Table>
                        <tbody>
                            {filieres}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    }
}

export default withRouter(CoursModifier);