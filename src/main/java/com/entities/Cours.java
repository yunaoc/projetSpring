package com.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Cours {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String intitule;

    @ManyToMany
    private List<Filiere> lesFilieres;

    @OneToMany
    private List<Vacataire> lesVacataires;

    public Cours() {
        this.lesFilieres = new ArrayList<>();
        this.lesVacataires = new ArrayList<>();
    }

    public void addFiliere(Filiere filiere) { this.lesFilieres.add(filiere); }

    public void removeFiliere(Filiere filiere) { this.lesFilieres.remove(filiere); }

    public void addVacataire(Vacataire vacataire) { this.lesVacataires.add(vacataire); }

    public void removeVacataire(Vacataire vacataire) { this.lesVacataires.remove(vacataire); }
}