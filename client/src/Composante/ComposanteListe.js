import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Menu from '../Menu';
import { Link } from 'react-router-dom';

class ComposanteListe extends Component {

    constructor(props) {
        super(props);
        this.state = {composantes: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/badgeuse/composante')
            .then(response => response.json())
            .then(data => this.setState({composantes: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/badgeuse/composante/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedComposantes = [...this.state.composantes].filter(composante => composante.idComposante !== id);
            this.setState({composantes: updatedComposantes});
        });
    }

    render() {
        const {composantes, isLoading} = this.state;

        if (isLoading) {
            return <p>Chargement...</p>;
        }

        const composanteListe = composantes.map(composante => {
            return <tr key={composante.idComposante}>
                <td style={{whiteSpace: 'nowrap'}}>{composante.nomComposante}</td>
                <td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" tag={Link} to={"/composante/modifier/" + composante.idComposante}>Modifier</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(composante.idComposante)}>Supprimer</Button>
                        </ButtonGroup>
                    </td>
                </td>
            </tr>
        });

        return (
            <div>
                <Menu/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/composante/creer">Ajouter composante</Button>
                    </div>
                    <h3>Liste des Composantes</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Nom</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {composanteListe}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ComposanteListe;