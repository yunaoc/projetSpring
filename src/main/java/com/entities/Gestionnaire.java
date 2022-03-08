package com.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class Gestionnaire extends Utilisateur{
    @ManyToOne
    @JoinColumn(name = "id_composante")
    @JsonBackReference
    private Composante maComposante;

    public Composante getMaComposante() {
        return maComposante;
    }

    public void setMaComposante(Composante maComposante) {
        this.maComposante = maComposante;
    }

}
