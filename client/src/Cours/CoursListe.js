import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Menu from '../Menu';
import { Link } from 'react-router-dom';

class CoursListe extends Component {

    constructor(props) {
        super(props);
        this.state = {lesCours : []};
        this.remove = this.remove.bind(this);
    }



    async componentDidMount() {
        const cours = await (await fetch(`/badgeuse/cours/`)).json();
        this.setState({lesCours: cours});
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    async remove(id) {
        await fetch(`badgeuse/cours/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCours = [...this.state.lesCours].filter(i => i.id !== id);
            this.setState({lesCours: updatedCours});
        });
    }

    render() {
        const {lesCours} = this.state;
        const listeDesCours = lesCours.map(cours => {
            const filieres = cours.lesFilieres.map(filiere => {
                return <div>{filiere.nomFiliere}</div>;
            });
            const vacataires = cours.lesVacataires.map(vacataire => {
                return <div>{vacataire.nomUsuel} {vacataire.prenom}</div>;
            });

            return <tr key={cours.id}>
                <td style={{whiteSpace: 'nowrap'}}>{cours.intitule}</td>
                <td style={{whiteSpace: 'nowrap'}}>{filieres}</td>
                <td style={{whiteSpace: 'nowrap'}}>{vacataires}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/coursModifier/" + cours.id}>Modifier</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(cours.id)}>Supprimer</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Menu/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/coursCreer">Ajouter cours</Button>
                    </div>
                    <h3>Liste des cours</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Intitulé</th>
                            <th width="20%">Filières</th>
                            <th>Vacataires</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listeDesCours}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default CoursListe;