import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Menu from '../Menu';
import { Link } from 'react-router-dom';

class FiliereListe extends Component {

    constructor(props) {
        super(props);
        this.state = {filieres: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/badgeuse/filiere')
            .then(response => response.json())
            .then(data => this.setState({filieres: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/badgeuse/filieree/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedFilieres = [...this.state.filieres].filter(filiere => filiere.idFiliere !== id);
            this.setState({filieres: updatedFilieres});
        });
    }

    render() {
        const {filieres, isLoading} = this.state;

        if (isLoading) {
            return <p>Chargement...</p>;
        }

        const filiereListe = filieres.map(filiere => {
            return <tr key={filiere.idFiliere}>
                <td style={{whiteSpace: 'nowrap'}}>{filiere.codeFiliere}</td>
                <td style={{whiteSpace: 'nowrap'}}>{filiere.nomFiliere}</td>
                <td style={{whiteSpace: 'nowrap'}}>{filiere.maComposante.idComposante} - {filiere.maComposante.nomComposante}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/filiere/modifier/" + filiere.idFiliere}>Modifier</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(filiere.idFiliere)}>Supprimer</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Menu/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/filiereCreer">Ajouter Filière</Button>
                    </div>
                    <h3>Liste des Filières</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Code</th>
                            <th width="20%">Nom</th>
                            <th width="20%">Composante</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filiereListe}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default FiliereListe;