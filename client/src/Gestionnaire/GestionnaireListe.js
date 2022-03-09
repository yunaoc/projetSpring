import React, { Component } from 'react';
import '../App.css';
import Menu from '../Menu';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class GestionnaireList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gestionnaires: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/badgeuse/gestionnaire/');
        const body = await response.json();
        this.setState({ gestionnaires: body, isLoading: false });
    }

    async remove(id) {
        await fetch(`/badgeuse/gestionnaire/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGestionnaires = [...this.state.gestionnaires].filter(i => i.id !== id);
            this.setState({gestionnaires: updatedGestionnaires});
        });
    }

    render() {
        const {gestionnaires, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const gestionnaireList = gestionnaires.map(gestionnaire => {
            return <tr key={gestionnaire.id}>
                <td style={{whiteSpace: 'nowrap'}}>{gestionnaire.nomUsuel}</td>
                <td style={{whiteSpace: 'nowrap'}}>{gestionnaire.prenom}</td>
                <td style={{whiteSpace: 'nowrap'}}>{gestionnaire.mail}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/gestionnaire/modifier/" + gestionnaire.id}>Modifier</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(gestionnaire.id)}>Supprimer</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Menu/>
                <p></p>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/gestionnaire/nouveau">Ajouter Gestionnaire</Button>
                    </div>
                    <h3>Les gestionnaires :</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="25%">Nom</th>
                            <th width="25%">Prenom</th>
                            <th width="25%">Email</th>
                            <th width="25%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {gestionnaireList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default GestionnaireList;