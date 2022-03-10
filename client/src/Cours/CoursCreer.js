import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import Menu from '../Menu';

class CoursCreer extends Component {

    emptyItem = {
        id : 0,
        intitule: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            lesFilieres : [],
            aAjouter : [],
            errors : {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const filieres = await (await fetch(`/badgeuse/filiere/`)).json();
        this.setState({lesFilieres: filieres});
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
            await fetch('/badgeuse/cours', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            })
            this.ajoutFilieres()
            setTimeout(function() {
                window.location.replace('/coursListe');
            }, 1000);
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

    async ajoutFilieres(){
        const lesCours = await (await fetch(`/badgeuse/cours/`)).json();
        const {aAjouter} = this.state
        console.log(aAjouter)
        const lesId = lesCours.map(cours => {
            return cours.id
        });
        const idCours = Math.max(...lesId)
        for (var i = 0; i < aAjouter.length ; i++) {
            await fetch(`../badgeuse/cours/addFiliere/?idCours=${idCours}&idFiliere=${aAjouter[i]}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    addFiliere(id) {
        this.setState(previousState => ({
            aAjouter: [...previousState.aAjouter, id]
        }));
    }

    removeFiliere(id) {
        const aAjouter = this.state.aAjouter.filter(item => item !== id);
        this.setState({ aAjouter: aAjouter });
    }

    checkFiliere(val) {
        return this.state.aAjouter.some(item => val === item);
    }

    render() {
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
                <h2>Créer cours</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="intitule">Intitulé</Label><br/>
                        <span >{err.intitule}</span>
                        <Input type="text" name="intitule" id="intitule" onChange={this.handleChange}/>
                    </FormGroup>
                    <div>
                        <h4>Filières</h4>
                        <Table>
                            <tbody>
                            {filieres}
                            </tbody>
                        </Table>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Confirmer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/coursListe">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(CoursCreer);