import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Menu from '../Menu';
import { Link } from 'react-router-dom';

class VacataireListe extends Component {

    constructor(props) {
        super(props);
        this.state = {vacataires : []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('badgeuse/vacataire/')
            .then(response => response.json())
            .then(data => this.setState({vacataires: data}));
    }

    async remove(id) {
        await fetch(`badgeuse/vacataire/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedVacataires = [...this.state.vacataires].filter(i => i.id !== id);
            this.setState({vacataires: updatedVacataires});
        });
    }

    render() {
        const {vacataires} = this.state;

        const listeVacataires = vacataires.map(vacataire => {
            return <tr key={vacataire.id}>
                <td style={{whiteSpace: 'nowrap'}}>{vacataire.nomUsuel} {vacataire.prenom}</td>
                <td style={{whiteSpace: 'nowrap'}}>{vacataire.login}</td>
                <td style={{whiteSpace: 'nowrap'}}>{vacataire.mail}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/vacataireModifier/" + vacataire.id}>Modifier</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(vacataire.id)}>Supprimer</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Menu/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/vacataireCreer">Ajouter vacataire</Button>
                    </div>
                    <h3>Liste des vacataires</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Nom Prénom</th>
                            <th width="20%">Login</th>
                            <th>Mail</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listeVacataires}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default VacataireListe;