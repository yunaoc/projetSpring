import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Menu from '../Menu';
import bcrypt from "bcryptjs";
import Select from 'react-select';

class VacataireModifier extends Component {

    emptyItem = {
        nomUsuel: '',
        prenom: '',
        mail: '',
        login: '',
        motDePasse: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            lesCours : [],
            choixCours : { id: 0, intitule: "Pas de cours" },
            optionsCours : [],
            coursOriginal : { id: 0, intitule: "Pas de cours" },
            errors: {},
            vacataires : [],
            gestionnaires : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelection = this.handleChangeSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const vacataire = await (await fetch(`/badgeuse/vacataire/${this.props.match.params.id}`)).json();
        const vacataires = await (await fetch(`/badgeuse/vacataire/`)).json();
        const gestionnaires = await (await fetch(`/badgeuse/gestionnaire/`)).json();
        const cours = await (await fetch(`/badgeuse/cours/`)).json();
        vacataire.motDePasse=null;
        this.setState({item: vacataire});
        this.setState({vacataires: vacataires});
        this.setState({gestionnaires: gestionnaires});
        this.setState({lesCours: cours});
        const sonCours = this.checkCours(this.state.item.login)
        if(typeof sonCours !== "undefined"){
            this.setState({choixCours: { id: sonCours.id, intitule: sonCours.intitule }});
            this.setState({coursOriginal: { id: sonCours.id, intitule: sonCours.intitule }});
        }
        this.setState({optionsCours: this.state.lesCours});
        this.setState(previousState => ({
            optionsCours: [...previousState.optionsCours, { id: 0, intitule: "Pas de cours" }]
        }));
    }

    checkCours(val) {
        const existe = this.state.lesCours.map(cours => {
            const existe2 =cours.lesVacataires.map(vacataire => {
                return vacataire.login === val
            });
            if(existe2.length!==0 && existe2[0])
                return cours
        });
        return existe.filter(cours=>cours!==undefined)[0];
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleChangeSelection = (choixCours) => {
        this.setState({ choixCours });
    }

    async handleSubmit(event) {
        event.preventDefault();

        if(this.validate()) {
            this.handleSubmitSelection()
            const {item} = this.state;

            await fetch('/badgeuse/vacataire/update/?id=' + item.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/vacataire');
        }
    }

    handleSubmitSelection(){
        const {choixCours} = this.state
        const {coursOriginal} = this.state
        if(choixCours !== coursOriginal){
            if(coursOriginal.id !== 0) {
                this.removeCours(coursOriginal.id).catch(err => { console.log(err) });
            }
            if(choixCours.id !== 0)
                this.addCours(choixCours.id).catch(err => { console.log(err) });
        }
    }

    checkMail(val) {
        const existe = this.state.vacataires.map(vacataire => {
            if(vacataire.id !== this.state.item.id)
                return vacataire.mail === val
        });
        return existe.some(item => true === item);
    }

    validate(){
        let input = this.state.item;
        let errors = {};
        let isValid = true;


        if (this.checkMail(input["mail"])) {
            isValid = false;
            errors["mail"] = "Adresse mail déjà utilisée";
        }

        if (typeof input["mail"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["mail"])) {
                isValid = false;
                errors["mail"] = "Saisir une adresse mail valide";
            }
        }

        if (!input["motDePasse"] && input["motDePasse2"] ) {
            isValid = false;
            errors["motDePasse"] = "Saisir un mot de passe";
        }

        if (input["motDePasse"]){

            if (!input["motDePasse2"]) {
                isValid = false;
                errors["motDePasse2"] = "Confirmer le mot de passe";
            }

            if (input["motDePasse"] !== input["motDePasse2"]) {
                isValid = false;
                errors["motDePasse"] = "Les mots de passe sont différents";
            } else
                this.state.item["motDePasse"] = bcrypt.hashSync(input["motDePasse"], '$2a$10$81C0NmOGFacMZsWp20poXO');
        }


        this.setState({
            errors: errors
        });

        return isValid;
    }

    async addCours(id) {
        await fetch(`/badgeuse/cours/addVacataire/?idCours=${id}&idVacataire=${this.state.item.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async removeCours(id) {
        await fetch(`/badgeuse/cours/removeVacataire/?idCours=${id}&idVacataire=${this.state.item.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    render() {
        const {item} = this.state;
        const err = this.state.errors;

        return <div>
            <Menu/>
            <Container>
                <h2>Modifier vacataire</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="nomUsuel">Nom</Label>
                            <Input type="text" name="nomUsuel" id="nomUsuel" value={item.nomUsuel}
                                   onChange={this.handleChange} autoComplete="nomUsuel"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="prenom">Prenom</Label>
                            <Input type="text" name="prenom" id="prenom" value={item.prenom}
                                   onChange={this.handleChange} autoComplete="prenom"/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="mail">Email</Label><br/>
                            <span >{err.mail}</span>
                            <Input type="text" name="mail" id="mail" value={item.mail}
                                   onChange={this.handleChange} autoComplete="mail"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="selectionCours">Cours</Label><br/>
                            <Select
                                value={this.state.choixCours}
                                options={this.state.optionsCours}
                                getOptionLabel ={(cours)=>cours.intitule}
                                getOptionValue ={(cours)=>cours.id}
                                onChange={this.handleChangeSelection}
                            />
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup  className="col-md-10 mb-6">
                            <Label for="login">Login : {item.login}</Label>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse">Nouveau mot de passe</Label><br/>
                            <span >{err.motDePasse}</span>
                            <Input type="password" name="motDePasse" id="motDePasse" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="motDePasse2">Confirmation du mot de passe</Label><br/>
                            <span >{err.motDePasse2}</span>
                            <Input type="password" name="motDePasse2" id="motDePasse2" onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <FormGroup>
                        <Button color="primary" type="submit">Confimer</Button>{' '}
                        <Button color="secondary" tag={Link} to="/vacataire">Annuler</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(VacataireModifier);