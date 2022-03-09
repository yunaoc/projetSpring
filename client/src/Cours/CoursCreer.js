import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';

class CoursCreer extends Component {

    emptyItem = {
        intitule: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            errors : {}
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
        let errors = {};
        if (!this.state.item["intitule"]) {
            errors["intitule"] = "Saisir un intitulé";
            this.setState({
                errors: errors
            });
        }
        else {
            console.log(this.state);
            const {item} = this.state;
            await fetch('/badgeuse/cours', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/coursListe');
        }
    }

    render() {
        const err = this.state.errors;
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
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/coursListe">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(CoursCreer);